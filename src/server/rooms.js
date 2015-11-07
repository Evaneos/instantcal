import { getEvents } from './googleCalendar';

let nextEvents;

export function watch() {
    if (watch.running) {
        return;
    }

    watch.running = setInterval(async function () {
        const events = await getEvents();
        const mustUpdate = !nextEvents || events.length !== nextEvents.length ||
                           !nextEvents.every((event, index) => events[index].id === event.id);
        console.log(mustUpdate);//, nextEvents && nextEvents.map(e => e.id).join(','), events.map(e => e.id).join(','));
        nextEvents = events;
    }, 1000)
}

export async function checkRoomBusy() {
    return nextEvents && nextEvents.length && nextEvents[0].startDate.getTime() < Date.now() || false;
}
