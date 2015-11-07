import React, { Component, PropTypes } from 'react';
import CalendarList from './CalendarList';

export default class CalendarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
    }

    render() {
        return <div className="calendarContainer">
            <h1>Calendar</h1>
            <CalendarList data={this.state.data} />
        </div>
    }
}
