import render from '../renderHtml';
import IndexPage from '../../components/IndexPage';
import { getRoom, getAllRoomsExcept } from '../rooms';
import { webSocketPort } from '../webSocket';

export default async function action(ctx) {
    const roomName = ctx.path.trim().replace(/^\/+/, '');
    const room = getRoom(roomName);

    if (!room) {
        ctx.body = 'room not found';
        ctx.status = 404;
        return;
    }

    const otherRooms = getAllRoomsExcept(room);

    ctx.body = render({
        Component: IndexPage,
        data: { room, otherRooms },
        htmlData: {
            hostname: ctx.hostname,
            webSocketPort,
            room,
            otherRooms,
        }
    });
}
