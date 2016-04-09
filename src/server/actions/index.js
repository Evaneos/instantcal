import render from '../renderHtml';
import IndexPage from '../../components/IndexPage';
import { getByNameOrSlug, getAll } from '../rooms';
import { webSocketPort } from '../webSocket';

function queryToRoomNames(queryPart) {
    return queryPart && queryPart.trim().split(',') || [];
}

export default async function action(ctx) {
    const mainRoomNames = queryToRoomNames(ctx.query.mainRoom);
    const otherRoomNames = queryToRoomNames(ctx.query.otherRooms || decodeURI(ctx.path).trim().replace(/^\/+/, ''));

    const rooms = getAll();
    const [mainRooms, otherRooms] = [mainRoomNames, otherRoomNames]
        .map(roomNames => (
            roomNames.map(roomName => {
                const room = getByNameOrSlug(roomName);
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

    ctx.body = render({
        View: IndexPage,
        data,
        htmlData: {
            hostname: ctx.hostname,
            webSocketPort,
            ...data,
        },
    });
}
