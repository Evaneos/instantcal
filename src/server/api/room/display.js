import getRoom from './_get';
import roomTransformer from '../transformers/room';

export default async function displayRoom(ctx) {
    const room = getRoom(ctx.query.room);
    ctx.assert(room, 'Room not found', 404);

    ctx.body = {
        room: roomTransformer(room),
    };
}
