import { getAll } from '../../rooms';
import roomTransformer from '../transformers/roomTransformer';

export default async function displayRoom(ctx) {
    const onlyAvailable = ctx.query.available != null && ctx.query.available !== 'false';
    let rooms = getAll();

    if (onlyAvailable) {
        rooms = rooms.filter(room => room.isAvailable);
    }

    ctx.body = {
        rooms: rooms.map(room => roomTransformer(room)),
    };
}
