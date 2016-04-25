import React, { PropTypes } from 'react';
import EventList from './EventList';
import calcRoomStatusClass from './calcRoomStatusClass';

Room.propTypes = {
    room: PropTypes.object,
    firstMainRoom: PropTypes.bool,
};

export default function Room({ room, firstMainRoom }) {
    const classStatus = calcRoomStatusClass(room);

    return (<div className={`room ${classStatus}${firstMainRoom ? ' first' : ''}`}>
        <div className="room-info">
            <div className="name">{room.name}</div>
        </div>
        <EventList currentEvent={room.currentEvent} nextEvents={room.todayNextEvents} />
    </div>);
}
