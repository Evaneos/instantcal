import { getAll } from '../../rooms';
import roomTransformer from '../transformers/roomTransformer';

export default async function displayRoom(ctx) {
    const rooms = getAll();

    ctx.body = {
        rooms: rooms.map(room => roomTransformer(room)),
    };
}
