import React, { Component, PropTypes } from 'react';
import CalendarCurrentEvent from './CalendarCurrentEvent'
import CalendarNextEvent from './CalendarNextEvent'

export default class Room extends Component {
    static propTypes = {
        room: PropTypes.object,
    };

    render() {
        const room = this.props.room;
        let status = room.isBusy ? 'est occupée' : (room.isBusySoon ? 'bientot occupée' : 'est libre');
        let emoticon = room.isBusy ? '¯\\_(ツ)_/¯' : '\\（＾ ＾）/';

        console.log('room.nextEvent', room.nextEvent);
        return (<div className="room">
            <div className="room-info">
                <div className="name">{room.name}</div>
                <div className="status">{status}</div>
                <div className="emoticon">{emoticon}</div>
            </div>
            <CalendarCurrentEvent currentEvent={room.currentEvent} />
            <CalendarNextEvent currentEvent={room.currentEvent} nextEvent={room.nextEvent} />
        </div>)
    }
}
