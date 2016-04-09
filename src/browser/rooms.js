import { on } from './webSocket';
import { update } from './app';
import Room from '../Room';

export function ready() {
    on('roomUpdated', (json) => {
        console.log('roomUpdated', json);
        const room = new Room();
        room._fromJson(json);
        console.log(room);
        update({ room });
    });
}

