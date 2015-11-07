import React, { Component, PropTypes } from 'react';
//import CalendarCurrentEvent from './CalendarCurrentEvent'

export default class Calendar extends Component {

    static propTypes = {
        room: PropTypes.object,
    };


    render() {

        let room = this.props.room;
        let isBusy = this.props.room.isBusy ? "red" : "green";
        let status = room.isBusy ? 'est occupée' : 'est libre';
        console.log('test', room);
        return (<div className={isBusy}>
            <div className="roomStatus">
                <div className="room">{this.props.room.name}</div>
                <div className="status">{status}</div>
                <div className="emoticone">¯\_(ツ)_/¯</div>
            </div>
        </div>)
    }
}
