import React, { Component, PropTypes } from 'react';

export default class RemainingTimeComponent extends Component {
    static propTypes = {
        date: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            timeRemaining: props.date.getTime() - Date.now(),
        };
    }

    componentDidMount() {
        this._timer = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    tick() {
        this.setState({ timeRemaining: this.props.date.getTime() - Date.now() });
    }

    render() {
        if (this.state.timeRemaining < 0) {
            return <span className="timeRemaining">-</span>;
        }

        const readableTime = new Date();
        readableTime.setTime(this.state.timeRemaining);
        const days = readableTime.getUTCDate() - 1;
        const hours = readableTime.getUTCHours();
        const minutes = readableTime.getUTCMinutes();

        return (<div className="time-remaining">
            {days ? <span className="days">{days} {days === 1 ? 'jour' : 'jours'}</span> : null}
            {hours ? <span className="hours">{days ? ' et ' : null}{hours}{'h'}</span> : null}
            {!days && hours < 3 && minutes ? <span className="minutes">{minutes} {minutes === 1 ? 'minute' : 'minutes'}</span> : null}
            {hours === 0 && minutes === 0 ? <span className="less-than-a-minute">{"< 1 min"}</span> : null}
        </div>);
    }
}
