import React, { PropTypes } from 'react';
import EventList from './EventList';
import calcRoomStatusClass from './calcRoomStatusClass';
import cx from 'classnames';

Room.propTypes = {
    room: PropTypes.object,
    firstMainRoom: PropTypes.bool,
};

export default function Room({ room, firstMainRoom }) {
    const classStatus = cx('room', {
        'available-soon': room.isBusy && room.isAvailableSoon,
        'busy': room.isBusy && !room.isAvailableSoon,
        'busy-soon': !room.isBusy && room.isBusySoon,
        'available': !room.isBusy && !room.isBusySoon,
        'first': firstMainRoom,
    });
    return (<div className={classStatus}>
        <div className="room-info">
            <div className="name">{room.name}</div>
        </div>
        <EventList currentEvent={room.currentEvent} nextEvents={room.todayNextEvents} />
    </div>);
}
