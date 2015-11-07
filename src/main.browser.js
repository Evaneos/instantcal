import './browser/app';
import { ready as readyRoom } from './browser/rooms';
import { create } from './browser/webSocket';

create().then(() => {
    readyRoom();
});
