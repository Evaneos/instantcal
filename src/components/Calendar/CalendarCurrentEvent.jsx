import React, { Component, PropTypes } from 'react';
import TimerReact from '../Timer';

export default class CalendarCurrentEvent extends Component {

    static propTypes = {
        currentEvent: PropTypes.object,
    };

    render() {

        let currentEvent = this.props.currentEvent ? this.props.currentEvent : null;
        let element = <div className="freeRoom"></div>
        if(currentEvent) {
            let endDate = new Date(currentEvent.endDate).getTime();
            let today = Date.now() + 3600000;
            let timeRemaining = new Date(endDate - today).getTime();
            let element = <div className="currentEvent">
                        Libre dans <TimerReact initialTimeRemaining={timeRemaining} />
                    </div>
        }




        return (element)
    }
}
