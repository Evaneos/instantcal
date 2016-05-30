import Room from '../../Room';
import { createEvent } from '../googleCalendar';
import { updateRoom } from '../rooms';

export async function bookRoom(room: Room, { timeInSeconds = 30, summary, description } = {}) {
    if (!room.isAvailable) {
        throw new Error('Room not available');
    }

    // const startDate = new Date(ctx.query.startDate);
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + timeInSeconds);

    const nextEvent = room.nextEvent;
    if (nextEvent && nextEvent.startDate.getTime() < endDate.getTime()) {
        throw new Error('Room not available until the end');
    }

    const event = await createEvent(room.calendarId, {
        summary,
        description,
        startDate,
        endDate,
        attendees: [{ email: room.calendarId, responseStatus: 'accepted' }],
    });

    await updateRoom(room);

    return event;
}
