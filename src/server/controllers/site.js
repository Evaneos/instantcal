import render from '../renderHtml';
import IndexPage from '../../components/IndexPage';
import { findRoomByName, getAll } from '../rooms';
import config from '../config';

function queryToRoomNames(queryPart) {
    return queryPart && queryPart.trim().split(',') || [];
}

export default {
    index: async function index(ctx) {
        const mainRoomNames = queryToRoomNames(ctx.query.mainRoom);
        const otherRoomNames = queryToRoomNames(ctx.query.otherRooms || ctx.route.namedParams && ctx.route.namedParams.get('roomName'));

        const rooms = getAll();
        const [mainRooms, otherRooms] = [mainRoomNames, otherRoomNames]
            .map(roomNames => (
                roomNames.map(roomName => {
                    const room = findRoomByName(roomName);
                    ctx.assert(room, 404, `room ${roomName} not found`);
                    return room;
                })
            ));

        ctx.assert(mainRooms.length < 2, 400, 'only one main room is supported');

        const data = {
            rooms,
            mainRoomName: mainRooms && mainRooms[0] && mainRooms[0].name,
            otherRoomNames: otherRooms.map(r => r.name),
        };

        const kiosk = ctx.query.kiosk != null;
        const noninteractive = ctx.query.noninteractive != null;
        const hideCursor = ctx.query.hideCursor != null;

        ctx.body = render({
            View: IndexPage,
            data,
            context: {
                kiosk,
                noninteractive,
                hideCursor,
            },
            htmlData: {
                kiosk,
                noninteractive,
                hideCursor,
                hostname: ctx.hostname,
                webSocketPort: config.get('webSocket').get('port'),
                ...data,
            },
        });
    },
};

