import React, { Component, PropTypes } from 'react';

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

        return (<div className={'event'}>
            <div className="event-info">
                <span class="start-end-hour">
                    <span className="start-hour">{ displayHour(startDate) } </span>
                    <span className="start-end-hour-separator"> - </span>
                    <span className="end-hour">{ displayHour(endDate) } </span>
                </span>
                <span className="summary">{event.summary}</span>
            </div>
            <div className="attendees">{event.attendees && event.attendees.map(a => `${a.symbol} ${a.name}`).join(', ')}</div>
        </div>)
    }
}
