import React, { Component, PropTypes } from 'react';

export default class Calendar extends Component {
    static contextTypes = {
        onInsertCss: PropTypes.func
    };

    render() {
        let availability = this.props.available ? "green" : "red";
        this.context.onInsertCss('body { background-color : ' + availability + '}');
        return (<div className={availability}>
        </div>)
    }
}
