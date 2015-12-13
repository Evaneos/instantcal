import React, { Component, PropTypes } from 'react';
import CalendarCurrentEvent from './CalendarCurrentEvent'
import CalendarNextEvents from './CalendarNextEvents'

export default class Room extends Component {
    static propTypes = {
        room: PropTypes.object,
    };

    render() {
        const room = this.props.room;
        let classStatus = room.isBusy ? 'busy' : (room.isBusySoon ? 'busy-soon' : 'available');
        let status = room.isBusy ? 'occupée' : (room.isBusySoon ? 'bientot occupée' : 'libre');
        // let emoticon = room.isBusy ? '¯\\_(ツ)_/¯' : '\\（＾ ＾）/';

        return (<div className={'room ' + classStatus}>
            <div className="room-info">
                <div className="name">{room.name}</div>
                <div className="status">{status}</div>
            </div>
            <CalendarCurrentEvent currentEvent={room.currentEvent} />
            <CalendarNextEvents currentEvent={room.currentEvent} nextEvents={room.nextEvents} />
        </div>)
    }
}
