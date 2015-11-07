import React, { Component, PropTypes } from 'react';

export default class Calendar extends Component {
    render() {
        let isBusy = this.props.isBusy ? "red" : "green";
        return (<div className={isBusy}>
            <div className="room">{this.props.roomName}</div>
        </div>)
    }
}
