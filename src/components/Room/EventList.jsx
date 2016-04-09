import React, { PropTypes } from 'react';
import Event from '../Event';
import cx from 'classnames';

EventListComponent.propTypes = {
    currentEvent: PropTypes.object,
    nextEvents: PropTypes.array,
};

export default function EventListComponent({ currentEvent, nextEvents }) {
    if (!currentEvent && (!nextEvents || !nextEvents.length)) {
        return (<div className="no-events">
            <div>{"Salle libre"}</div>
        </div>);
    }

    const currentEventClassname = cx('current-event', {
        'has-next-events': !!(nextEvents && nextEvents.length),
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
