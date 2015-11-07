import React, { Component, PropTypes } from 'react';

export default class Calendar extends Component {
    render() {
        let isBusy = this.props.isBusy ? "red" : "green";
        return (<div style={{width:'100%',height:'100%'}} className={isBusy}>
        </div>)
    }
}
