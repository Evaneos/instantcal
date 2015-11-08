import React, { Component, PropTypes } from 'react';

export default class TimerReact extends Component {
    static propTypes = {
        initialTimeRemaining: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {
            timeRemaining: this.props.initialTimeRemaining
        };
    }

    componentDidMount(){
        this._timer = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount(){
        clearInterval(this._timer);
    }

    tick() {
        let now = this.state.timeRemaining - 1000;
        this.setState({ timeRemaining: now });
    }

    render() {
        const readableTime = new Date();
        readableTime.setTime(this.state.timeRemaining);
        const hours = readableTime.getUTCHours();
        const minutes = readableTime.getUTCMinutes();

        return <span className="timeRemaining">
            { hours ? <span className="hours">{hours} {hours === 1 ? 'heure' : 'heures'}</span> : null }
            { hours < 3 && minutes !== 0 ? <span className="minutes">{hours ? ' et ' : null }{minutes} {minutes === 1 ? 'minute' : 'minutes'}</span> : null }
            { hours === 0 && minutes === 0 ? <span className="less-than-a-minute">moins d'une minute</span> : null }
        </span>;
    }
}
