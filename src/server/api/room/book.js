import getRoom from './_get';
import roomTransformer from '../transformers/room';
import { createEvent } from '../../googleCalendar';

// TODO POST method
export default async function bookRoom(ctx) {
    const room = getRoom(ctx.query.room);
    ctx.assert(room, 'Room not found', 404);
    ctx.assert(room.isAvailable, 'Room not available', 400);

    const timeInSeconds = ctx.query.timeInSeconds || 30;
    // const startDate = new Date(ctx.query.startDate);
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + timeInSeconds);

    const summary = ctx.query.summary;
    const description = ctx.query.description;

    // TODO check if the room is available

    const event = await createEvent(room.calendarId, {
        summary,
        description,
        startDate,
        endDate,
        attendees: [{ email: room.calendarId, responseStatus: 'accepted' }],
    });
    // avoid waiting to block the booking
    // TODO webhook
    room._busy = true;

    ctx.body = {
        room: roomTransformer(room),
        success: true,
        event: event,
    };
}
