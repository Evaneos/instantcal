import React, { Component, PropTypes } from 'react';
import Calendar from './Calendar/Calendar';

export default class IndexPage extends Component {


    render() {
        const title = 'Calendar Checker';
        return (
            <Calendar isBusy={this.props.isBusy} />
        );
    }
}
