import { getEvents } from './googleCalendar';
import { emit } from './webSocket';
import Room from '../Room';
import { ConsoleLogger } from 'nightingale';
import { slugify } from 'transliteration';

import { rooms as roomsConfig } from '../../config';

let rooms = new Map();
const logger = new ConsoleLogger('app.rooms');

roomsConfig.forEach(room => {
    const slug = slugify(room.name);
    rooms.set(room.name, new Room(room.name, slug, room.calendarId))
});

export function watch() {
    if (watch.running) {
        return;
    }

    logger.debug('watch');
    watch.running = Array.from(rooms.values()).map(room => {
        _updateRoom(room);
        return setInterval(() => _updateRoom(room), 2000 * roomsConfig.length);
    });
}

async function _updateRoom(room) {
    logger.debug('updating', { roomName: room.name, calendarId: room.calendarId });
    try {
        const events = await getEvents(room.calendarId);

        if (room._updateEvents(events)) {
            logger.success('room updated !', { roomName: room.name });
            // console.log(room.name, nextEvents && nextEvents.map(e => e.id).join(','), events.map(e => e.id).join(','));
            emit('roomUpdated', room._toJson());
        }
    } catch (err) {
        logger.error('room update failed', { roomName: room.name });
        logger.error(err);
    }
}

export function hasRoom(name) {
    return rooms.has(name);
}

export function getRoom(name) {
    return rooms.get(name);
}

export function hasSlug(slug) {
    return rooms.has(slug);
}

export function getSlug(slug) {
    return rooms.get(slug);
}

export function getAllRoomsExcept(roomNames) {
    return Array.from(rooms.values()).filter(r => roomNames.indexOf(r.name) === -1);
}
