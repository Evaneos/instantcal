import React, { Component, PropTypes } from 'react';
import TimerReact from '../Timer';

export default class CalendarNextEvent extends Component {

    static propTypes = {
        nextEvent: PropTypes.object,
    };

    render() {

        let nextEvent = this.props.nextEvent ? this.props.nextEvent : null;
        let element = <div className="freeRoom"></div>
        if(nextEvent) {
            let endDate = new Date(nextEvent.endDate).getTime();
            let today = Date.now() + 3600000;
            let timeRemaining = new Date(endDate - today).getTime();
            let element = <div className="nextEvent">
                        Prochaine réservation dans <TimerReact initialTimeRemaining={timeRemaining} />
                    </div>
        }




        return (element)
    }
}
