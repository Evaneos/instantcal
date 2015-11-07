import { on } from './webSocket';
import { update } from './app';
import Room from '../Room';

on('roomUpdated', (json) => {
    console.log(json);
    const room = new Room();
    room._fromJson(json);
    update({ isBusy: room.isBusy });
});
