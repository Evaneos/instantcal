import { findRoomByName, getRoomBySlug } from '../../rooms';
import roomTransformer from '../transformers/roomTransformer';
import eventTransformer from '../transformers/eventTransformer';
import { bookRoom } from '../../services/roomService';

// TODO POST method
export default async function bookRoomPostMethod(ctx) {
    const room = ctx.query.room ? findRoomByName(ctx.query.room) : getRoomBySlug(ctx.route.namedParams.get('roomName'));
    ctx.assert(room, 'Room not found', 404);

    let event;

    try {
        event = await bookRoom(room, {
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
