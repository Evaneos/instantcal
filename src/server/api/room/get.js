import { getRoomBySlug } from '../../rooms';
import roomTransformer from '../transformers/roomTransformer';

export default async function displayRoom(ctx) {
    const room = getRoomBySlug(ctx.route.namedParams.get('roomName'));
    ctx.assert(room, 'Room not found', 404);

    ctx.body = {
        room: roomTransformer(room),
    };
}
