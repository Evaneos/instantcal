import { getEvents } from './googleCalendar';
import { emit } from './webSocket';
import Room from '../Room';
import { ConsoleLogger } from 'nightingale';

import { rooms as roomsConfig } from '../../config';

let rooms = new Map();
const logger = new ConsoleLogger('app.rooms');

roomsConfig.forEach(room => rooms.set(room.name, new Room(room.name, room.calendarId)));

export function watch() {
    if (watch.running) {
        return;
    }

    logger.debug('watch');
    watch.running = Array.from(rooms.values()).map(room => {
        return setInterval(async function () {
            logger.debug('updating', { roomName: room.name, calendarId: room.calendarId });
            try {
                const events = await getEvents(room.calendarId);

                if (room._updateEvents(events)) {
                    logger.success('room updated !', { roomName: room.name });
                    console.log(room.name);//, nextEvents && nextEvents.map(e => e.id).join(','), events.map(e => e.id).join(','));
                    emit('roomUpdated', room._toJson());
                }
            } catch (err) {
                logger.error(err);
            }
        }, 2000 * roomsConfig.length);
    });
}

export function hasRoom(name) {
    return rooms.has(name);
}

export function getRoom(name) {
    return rooms.get(name);
}
