import React, { Component, PropTypes } from 'react';

export default class TimerReact extends Component {

    static propTypes = {
        initialTimeRemaining: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {
            timeRemaining: this.props.initialTimeRemaining
        }
    }

    componentDidMount(){
        this.timer = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount(){

        clearInterval(this.timer);
    }

    tick(){

        let now = this.state.timeRemaining - 1000;
        this.setState({timeRemaining: now});
    }

    render() {


        let readableTime = new Date(this.state.timeRemaining);

        return <div className="timeRemaining">
            <span className="hours">{readableTime.getHours()} Heures</span>
            <span className="minutes">{readableTime.getMinutes()} Minutes</span>
        </div>;
    }
}
