import socketio from 'socket.io';
import { createServer } from 'http';
import argv from './argv';
import Logger from 'nightingale';
import errorParser from 'alouette';
import { getByNameOrSlug } from './rooms';
import { bookRoom } from './services/roomService';
const config = require('../../config.js');

const logger = new Logger('app.webSocket');

export const webSocketPort = argv.webSocketPort || 3016;
const server = createServer();
export const io = socketio(server, config.webSocket);

io.use((socket, next) => {
    // const handshakeData = socket.request;
    next();
});

server.listen(webSocketPort, () => {
    logger.success('listening', { port: webSocketPort });
});

io.on('connection', socket => {
    socket.emit('hello');
    socket.on('bookRoom', (roomName, callback) => {
        const room = getByNameOrSlug(roomName);
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

export function emit(...args) {
    logger.debug('webSocket [emit]', { args: args });
    io.emit(...args);
}
