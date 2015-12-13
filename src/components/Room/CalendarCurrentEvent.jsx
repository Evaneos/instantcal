import React, { Component, PropTypes } from 'react';
import RemainingTime from '../RemainingTime';
import Event from '../Event';

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
            <Event event={currentEvent} />
            <div>
                Libre dans <RemainingTime initialTimeRemaining={timeRemaining} />
            </div>
        </div>;
    }
}
