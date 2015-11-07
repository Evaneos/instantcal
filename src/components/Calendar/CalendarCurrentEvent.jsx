import React, { Component, PropTypes } from 'react';

export default class CalendarCurrentEvent extends Component {

    static propTypes = {
        currentEvent: PropTypes.object,
    };

    render() {

        let currentEvent = this.props.currentEvent;
        return (<div className="currentEvent">

        </div>)
    }
}
