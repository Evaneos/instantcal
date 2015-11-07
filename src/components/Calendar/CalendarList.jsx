import React, { Component, PropTypes } from 'react';
import Calendar from './Calendar';

export default class CalendarList extends Component {
    render() {
        var calendars = this.props.data.map((calendar) => {
            return (<Calendar event={calendar.items}>
                {calendar.text}
            </Calendar>)
        });
        return (<div className="calendarList">
            {calendars}
        </div>)
    }
}
