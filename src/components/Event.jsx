import React, { PropTypes } from 'react';
import RemainingTime from './RemainingTime';

function displayHour(date) {
    return `${date.getHours()}h${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
}

EventComponent.propTypes = {
    event: PropTypes.object.isRequired,
    currentEvent: PropTypes.bool.isRequired,
};


export default function EventComponent({ event, currentEvent }) {
    if (!currentEvent && (!nextEvents || !nextEvents.length)) {
        return (<div className="no-events">
            <div>{"Salle libre"}</div>
        </div>);
    }

    const { startDate, endDate } = event;

    return (<div className={'event'}>
        <div className="hour">
            <span className="start-hour">{displayHour(startDate)} </span>
            <span className="start-end-hour-separator"> - </span>
            <span className="end-hour">{displayHour(endDate)} </span>
        </div>
        <div className="event-info">
            <div className="summary">{event.summary}</div>
            {currentEvent &&
             <div className="time">
                 <RemainingTime date={endDate} />
             </div>
            }
        </div>
        <div className="attendees">{event.attendees && event.attendees.map(a => `${a.symbol} ${a.name}`).join(', ')}</div>
    </div>);
}
