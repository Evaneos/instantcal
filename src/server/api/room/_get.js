import Room from '../../../Room';
import { getByNameOrSlug } from '../../rooms';

export default function getRoom(roomName): Room {
    return getByNameOrSlug(roomName);
}
