export default function calcRoomStatusClass(room) {
    if (room.isBusy) {
        return room.isAvailableSoon ? 'available-soon' : 'busy';
    } else {
        return room.isBusySoon ? 'busy-soon' : 'available';
    }
}
