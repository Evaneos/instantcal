import React, { Component, PropTypes } from 'react';
import Calendar from './Calendar/Calendar';

export default class IndexPage extends Component {

    static propTypes = {
        room: PropTypes.object,
    };


    render() {
        const title = 'Calendar Checker';
        return (
            <Calendar isBusy={this.props.room.isBusy} />
        );
    }
}
