import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import IndexPage from '../components/IndexPage';

class App extends Component {

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        const roomStatus = window.roomStatus;
        this.state.isBusy = roomStatus;
    }

    render() {
        return <IndexPage isBusy={this.state.isBusy}/>;
    }
}

export function update(state) {
    console.log('in');
    app.setState(state);
}
