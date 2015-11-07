import React, { Component, PropTypes } from 'react';
import Calendar from './Calendar/Calendar';

export default class IndexPage extends Component {

    static propTypes = {
        room: PropTypes.object,
        otherRooms: PropTypes.object,
    };


    render() {
        const title = 'Calendar Checker';
        return (
            <Calendar room={this.props.room} otherRooms={this.props.otherRooms}/>
        );
    }
}
