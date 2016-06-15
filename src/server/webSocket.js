import Logger from 'nightingale';
import errorParser from 'alouette';
import { getRoomByName } from './rooms';
import { bookRoom } from './services/roomService';
import websocket from 'alp-websocket';

const logger = new Logger('app.webSocket');

let io;

export function init(app) {
    io = websocket(app, `${__dirname}/../../config/cert`);

    io.on('connection', socket => {
        socket.on('bookRoom', (roomName, callback) => {
            const room = getRoomByName(roomName);
            logger.info('bookRoom', { roomName });
            if (!room) return callback();
            bookRoom(room).then(() => {
                logger.info('room booked !', { roomName });
                callback(room._toJson());
            }).catch(err => {
                logger.info('failed to book room', { err });
                callback(room._toJson());
            });
        });
    });

    io.on('error', (err) => {
        try {
            errorParser.log(err);
        } catch (err2) {
            console.error(err.stack);
            console.error(err2.stack);
        }
    });
}

export function emit(...args) {
    logger.debug('webSocket [emit]', { args: args });
    if (io) io.emit(...args);
}
