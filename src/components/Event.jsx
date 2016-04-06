import React, { Component, PropTypes } from 'react';
import RemainingTime from './RemainingTime';

function displayHour(date) {
    return date.getHours() + 'h' +
           (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
}

export default class Event extends Component {
    static propTypes = {
        event: PropTypes.object,
    };

    render() {
        const event = this.props.event;

        if (!event) {
            return null;
        }

        let startDate = new Date(event.startDate);
        let endDate = new Date(event.endDate);
        let endTime = endDate.getTime();
        let timeRemaining = endTime - Date.now();

        return (<div className={'event'}>
            <div className="hour">
                <span className="start-hour">{ displayHour(startDate) } </span>
                <span className="start-end-hour-separator"> - </span>
                <span className="end-hour">{ displayHour(endDate) } </span>
            </div>
            <div className="event-info">
                <div className="summary">{event.summary}</div>
                {this.props.currentEvent &&
                 <div className="time">
                     <RemainingTime initialTimeRemaining={timeRemaining}/>
                 </div>
                }
            </div>
            <div className="attendees">{event.attendees && event.attendees.map(a => `${a.symbol} ${a.name}`).join(', ')}</div>
        </div>)
    }
}
