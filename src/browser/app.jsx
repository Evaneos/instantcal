import React, { Component, PropTypes } from 'react';
import Room from '../Room';
import ReactDOM from 'react-dom';
import IndexPage from '../components/IndexPage';

class App extends Component {

    constructor() {
        super();
        this.state = {
            room: (() => {
                const room = new Room();
                room._fromJson(window.room);
                return room;
            })()
        }
    }

    render() {
        return <IndexPage room={this.state.room}/>;
    }
}

const app = ReactDOM.render(<App />, document.getElementById('app'));

export function update(state) {
    app.setState(state);
}
