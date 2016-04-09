/* global io, webSocketPort */

let socket;

export function on(...args) {
    return socket.on(...args);
}

export function off(...args) {
    return socket.off(...args);
}

export function emit(...args) {
    console.log('webSocket [emit]', args);

    return new Promise((resolve, reject) => {
        let resolved;
        socket.emit(...args, (err, result) => {
            clearTimeout(resolved);
            console.log('webSocket [emit response]', args);
            if (err !== null) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        resolved = setTimeout(() => {
            console.log('webSocket [emit timeout]', args);
            reject(new Error('Timeout'));
        }, 10000);
    });
}

export function send(...args) {
    return socket.send(...args);
}

export function create() {
    return new Promise((resolve, reject) => {
        socket = io(
            `//${window.location.hostname}:${webSocketPort}`,
            {
                transports: ['websocket', 'polling', 'flashsocket'],
                reconnectionDelay: 500,
                reconnectionDelayMax: 3000,
                timeout: 2000,
            }
        );

        socket.once('connect', () => {
            resolve();
        });

        socket.on('connect', () => {
            document.getElementById('disconnected').style.display = 'none';
        });

        socket.on('disconnect', () => {
            document.getElementById('disconnected').style.display = 'block';
        });

        socket.on('hello', () => {
            console.log('hi');
        });

        socket.on('error', (err) => console.log(err.stack || err.message || err));
    });
}
