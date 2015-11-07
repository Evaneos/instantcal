import socketio from 'socket.io';
import { createServer } from 'http';
import argv from './argv';
import { ConsoleLogger } from 'nightingale';
import errorParser from 'alouette';
const config = require('../../config.js');

const logger = new ConsoleLogger('app.webSocket');

export const webSocketPort = argv.webSocketPort || 3016;
const server = createServer();
export const io = socketio(server, config.webSocket);

io.use(function(socket, next) {
    var handshakeData = socket.request;
    next();
});

server.listen(webSocketPort);

io.on('connection', function(socket) {
    socket.emit('hello');
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
