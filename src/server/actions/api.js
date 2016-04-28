import bookRoom from '../api/room/book';
import displayRoom from '../api/room/display';

export default async function action(ctx, next) {
    if (!ctx.path.startsWith('/api/')) {
        return await next();
    }

    const request = ctx.path.substr('/api/'.length);
    console.log(request);

    switch (request) {
        case 'room':
            await displayRoom(ctx);
            break;
        case 'room/book':
            await bookRoom(ctx);
            break;
    }
}
