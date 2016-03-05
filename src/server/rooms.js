import { getEvents } from './googleCalendar';
import { emit } from './webSocket';
import Room from '../Room';
import { ConsoleLogger } from 'nightingale';
import { slugify } from 'transliteration';

import { rooms as roomsConfig } from '../../config';

const rooms = new Map();
const roomsBySlug = new Map();
const logger = new ConsoleLogger('app.rooms');

roomsConfig.forEach(room => {
    const slug = slugify(room.name);
    const roomObject = new Room(room.name, slug, room.calendarId);
    rooms.set(room.name, roomObject);
    roomsBySlug.set(slug, roomObject);
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

export function getByNameOrSlug(nameOrSlug) {
    return rooms.get(nameOrSlug) || roomsBySlug.get(nameOrSlug);
}

export function getAll() {
    return Array.from(rooms.values());
}
