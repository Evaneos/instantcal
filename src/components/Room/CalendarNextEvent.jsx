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

        let startDate = new Date(nextEvent.startDate).getTime();
        let today = Date.now() + 3600000;
        let timeRemaining = new Date(startDate - today).getTime();
        return <div className="next-event">
            Prochaine réservation dans <TimerReact initialTimeRemaining={timeRemaining} />
        </div>
    }
}
