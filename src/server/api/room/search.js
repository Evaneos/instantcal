import { findRoomByName } from '../../rooms';
import roomTransformer from '../transformers/roomTransformer';

export default async function displayRoom(ctx) {
    const name = ctx.query.name;
    ctx.assert(name, 'Missing name parameter', 400);
    const room = findRoomByName(name);
    ctx.assert(room, `Room not found: "${name}"`, 404);

    ctx.body = {
        room: roomTransformer(room),
    };
}
