import Room from '../../../Room';
import { findRoomByName } from '../../rooms';

export default function findRoom(roomName): ?Room {
    return findRoomByName(roomName);
}
