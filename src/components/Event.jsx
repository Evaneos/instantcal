import React, { Component, PropTypes } from 'react';

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

        return (<div className={'event'}>
            <div className="event-info">
                <span className="start-hour">{ startDate.getHours() + 'h' +
                        (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes() } </span>
                <span className="summary">{event.summary}</span>
            </div>
            <div className="attendees">{event.attendees && event.attendees.map(a => `${a.symbol} ${a.name}`).join(', ')}</div>
        </div>)
    }
}
