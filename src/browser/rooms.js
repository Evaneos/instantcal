import { on } from './webSocket';
import { update } from './app';
import Room from '../Room';

export function ready() {
    on('roomUpdated', (json) => {
        const room = new Room();
        room._fromJson(json);
        update({ room });
    });
}

