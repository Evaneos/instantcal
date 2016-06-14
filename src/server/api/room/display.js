import findRoom from './_get';
import roomTransformer from '../transformers/roomTransformer';

export default async function displayRoom(ctx) {
    const room = findRoom(ctx.query.room);
    ctx.assert(room, 'Room not found', 404);

    ctx.body = {
        room: roomTransformer(room),
    };
}
