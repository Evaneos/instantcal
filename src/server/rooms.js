import { getEvents } from './googleCalendar';

let nextEvents;
let rooms = new Map();

class Room {
    constructor(name) {
        this.name = name;
    }

    _updateEvents(events) {
        if (!events.length) {
            this._busy = false;
            this._busySoon = false;
            return;
        }

        if (nextEvents[0].startDate.getTime() < Date.now()) {
            this._currentEvent = events[0];
            this._nextEvent = events[1];
            this._busySoon = null;
        } else {
            this._currentEvent = null;
            this._nextEvent = events[0];
            this._busySoon = this._nextEvent && this._nextEvent.startDate.getTime() < (Date.now() + 10000);
        }
    }

    get isBusy() {
        return this._busy;
    }

    get isBusySoon() {
        return this._busySoon;
    }
}


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
