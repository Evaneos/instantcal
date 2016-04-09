import React, { Component, PropTypes } from 'react';
import RemainingTime from '../RemainingTime';
import Event from '../Event';
import cx from 'classnames';

export default class CalendarNextEvents extends Component {

    static propTypes = {
        currentEvent: PropTypes.object,
        nextEvents: PropTypes.array,
    };

    render() {
        const currentEvent = this.props.currentEvent;
        const nextEvents = this.props.nextEvents;

        if (!currentEvent && (!nextEvents || !nextEvents.length)) {
            return (<div className="no-events">
                <div>{"Salle libre"}</div>
            </div>);
        }

        const currentEventClassname = cx('current-event', {
            'has-next-events': nextEvents && nextEvents.length ? true : false,
            'no-events': !(currentEvent || nextEvents && nextEvents.length),
        });
        return (<div className="events">
            <div className={currentEventClassname}>
                <Event event={currentEvent} currentEvent />
            </div>
            {!nextEvents ? '' : <div className="next-events">
                <ul className="event-list">
                    {nextEvents.map((nextEvent, index) => {
                        return (<li key={`nextEvent${index}`} className="event">
                            <Event event={nextEvent} currentEvent={false} />
                        </li>);
                    })}
                </ul>
            </div>}
        </div>);
    }
}
