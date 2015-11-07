import React, { Component, PropTypes } from 'react';
import Calendar from './Calendar/Calendar';

export default class IndexPage extends Component {
    /*static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };*/

    render() {
        const title = 'Calendar Checker';
        // this.context.onSetTitle(title);
        return (
            <Calendar isBusy={this.props.isBusy} />
        );
    }
}
