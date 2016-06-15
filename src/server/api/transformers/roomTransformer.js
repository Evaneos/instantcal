import Room from '../../../Room';
import eventTransformer from './eventTransformer';

export default function roomTransformer(room: Room) {
    const currentEvent = room.currentEvent;
    const nextEvent = room.nextEvent;
    return {
        name: room.name,
        slug: room.slug,
        available: !room.isBusy,
        busy: room.isBusy,
        busySoon: room.isBusySoon,
        availableSoon: room.isAvailableSoon,

        currentEvent: !currentEvent ? null : eventTransformer(room.currentEvent),
        nextEvent: !nextEvent ? null : eventTransformer(room.nextEvent),
    };
}
