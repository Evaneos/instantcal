import { getEvents } from './googleCalendar';
import { emit } from './webSocket';
import Room from '../Room';
import Logger from 'nightingale';
import { slugify } from 'transliteration';

import { rooms as roomsConfig } from '../../config';

const rooms = new Map();
const roomsBySlug = new Map();
const logger = new Logger('app.rooms');

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
        updateRoom(room);
        return setInterval(() => updateRoom(room), 10000 * roomsConfig.length);
    });
}

export async function updateRoom(room: Room) {
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

export function findRoomByName(name): ?Room {
    return roomsBySlug.get(slugify(name));
}

export function getRoomByName(name): ?Room {
    return rooms.get(name);
}

export function getAll(): Array<Room> {
    return Array.from(rooms.values());
}
