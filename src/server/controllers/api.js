import displayApiDoc from '../api/doc';
import listRooms from '../api/room/list';
import bookRoom from '../api/room/book';
import getRoom from '../api/room/get';
import searchRoom from '../api/room/search';

export default {
    doc: displayApiDoc,

    rooms: listRooms,
    room: getRoom,
    'room/search': searchRoom,
    'room/book': bookRoom,
};
