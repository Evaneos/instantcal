import React, { Component, PropTypes } from 'react';

export default class Calendar extends Component {
    static contextTypes = {
        onInsertCss: PropTypes.func
    };

    render() {
        let isBusy = this.props.isBusy ? "red" : "green";
        this.context.onInsertCss('body { background-color : ' + isBusy + '}');
        return (<div className={isBusy}>
        </div>)
    }
}
