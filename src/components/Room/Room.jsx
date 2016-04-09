import React, { PropTypes } from 'react';
import CalendarNextEvents from './CalendarNextEvents';

Room.propTypes = {
    room: PropTypes.object,
    firstMainRoom: PropTypes.bool,
};

export default function Room({ room, firstMainRoom }) {
    let classStatus = room.isBusy ? 'busy' : (room.isBusySoon ? 'busy-soon' : 'available');
    // let status = room.isBusy ? 'occupée' : (room.isBusySoon ? 'bientot occupée' : 'libre');
    // let emoticon = room.isBusy ? '¯\\_(ツ)_/¯' : '\\（＾ ＾）/';

    return (<div className={`room ${classStatus}${firstMainRoom ? ' first' : ''}`}>
        <div className="room-info">
            <div className="name">{room.name}</div>
        </div>
        <CalendarNextEvents currentEvent={room.currentEvent} nextEvents={room.nextEvents} />
    </div>);
}
