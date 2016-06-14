import findRoom from './_get';
import roomTransformer from '../transformers/roomTransformer';
import eventTransformer from '../transformers/eventTransformer';
import { bookRoom } from '../../services/roomService';

// TODO POST method
export default async function bookRoomPostMethod(ctx) {
    const room = findRoom(ctx.query.room);
    ctx.assert(room, 'Room not found', 404);

    let event;

    try {
        event = bookRoom(room, {
            timeInSeconds: ctx.query.timeInSeconds,
            summary: ctx.query.summary,
            description: ctx.query.description,
        });
    } catch (err) {
        ctx.throw(err.message, 400);
    }

    // avoid waiting to block the booking
    // TODO webhook
    room._busy = true;

    ctx.body = {
        room: roomTransformer(room),
        success: true,
        event: eventTransformer(event),
    };
}
