import React, { Component, PropTypes } from 'react';
import TimerReact from '../Timer';

export default class CalendarCurrentEvent extends Component {
    static propTypes = {
        currentEvent: PropTypes.object,
    };

    render() {
        let currentEvent = this.props.currentEvent;

        if (!currentEvent) {
            return null;
        }

        let endDate = nextEvent.endDate instanceof Date ? nextEvent.endDate : Date.parse(nextEvent.endDate);
        let endTime = endDate.getTime();
        let timeRemaining = endTime - Date.now();
        return <div className="current-event">
            Libre dans <TimerReact initialTimeRemaining={timeRemaining} />
        </div>;
    }
}
