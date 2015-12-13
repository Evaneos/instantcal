import React, { Component, PropTypes } from 'react';
import RemainingTime from '../RemainingTime';
import Event from '../Event';

export default class CalendarNextEvents extends Component {

    static propTypes = {
        currentEvent: PropTypes.object,
        nextEvents: PropTypes.array,
    };

    render() {
        const currentEvent = this.props.currentEvent;
        const nextEvents = this.props.nextEvents;

        if (!nextEvents || !nextEvents.length) {
            return null;
        }

        const nextEvent = nextEvents[0];
        let startDate = nextEvent.startDate instanceof Date ? nextEvent.startDate : new Date(nextEvent.startDate);
        let startTime = startDate.getTime();
        let timeRemaining = startTime - Date.now();

        const eventList = [];
        let lastDay;
        const today = new Date();

        nextEvents.forEach(nextEvent => {
            let startDate = new Date(nextEvent.startDate);
            const currentDay = `${startDate.getFullYear()}_${startDate.getMonth()}_${startDate.getDate()}`;
            if (lastDay != currentDay) {
                if (startDate.getFullYear() != today.getFullYear()
                        || startDate.getMonth() != today.getMonth()
                        || startDate.getDate() != today.getDate()) {
                    eventList.push(
                        <li className="day">{`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`}</li>
                    );
                }
                lastDay = currentDay;
            }

            eventList.push(
                <li className="event">
                    <Event event={nextEvent} />
                </li>
            )
        });

        return <div className="next-events">
            <ul className="event-list">
                {eventList}
            </ul>
        </div>
    }
}
