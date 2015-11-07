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

        let endDate = new Date(currentEvent.endDate).getTime();
        let today = Date.now() + 3600000;
        let timeRemaining = new Date(endDate - today).getTime();
        return <div className="current-event">
            Libre dans <TimerReact initialTimeRemaining={timeRemaining} />
        </div>;
    }
}
