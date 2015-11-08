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

        let endDate = currentEvent.endDate instanceof Date ? currentEvent.endDate : new Date(currentEvent.endDate);
        let endTime = endDate.getTime();
        let timeRemaining = endTime - Date.now();
        return <div className="current-event">
            Libre dans <TimerReact initialTimeRemaining={timeRemaining} />
        </div>;
    }
}