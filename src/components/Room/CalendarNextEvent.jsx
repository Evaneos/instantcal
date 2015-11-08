import React, { Component, PropTypes } from 'react';
import TimerReact from '../Timer';

export default class CalendarNextEvent extends Component {

    static propTypes = {
        currentEvent: PropTypes.object,
        nextEvent: PropTypes.object,
    };

    render() {
        const currentEvent = this.props.currentEvent;
        const nextEvent = this.props.nextEvent;

        if (!nextEvent || currentEvent) {
            return null;
        }

        let startDate = nextEvent.startDate instanceof Date ? nextEvent.startDate : Date.parse(nextEvent.startDate);
        let startTime = startDate.getTime();
        let timeRemaining = startTime - Date.now();

        return <div className="next-event">
            Prochaine réservation dans <TimerReact initialTimeRemaining={timeRemaining} />
        </div>
    }
}
