import React, { Component, PropTypes } from 'react';
import Calendar from './Calendar';

export default class IndexPage extends Component {
    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired,
    };

    render() {
        const title = 'Screen Test !';
        this.context.onSetTitle(title);
        return (
            <div>

            </div>
        );
    }

}

//<Calendar apiKey="AIzaSyB3dwyKm_mTWbkaBVBGDiGIDGomfZTQSCA" calendarID="evaneos.com_mekte5o9ooduhsi907t3jrh26c@group.calendar.google.com" />
