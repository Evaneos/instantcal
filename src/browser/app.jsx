import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import IndexPage from '../components/IndexPage';

class App extends Component {

    constructor() {
        super();
        this.state = {
            isBusy : window.roomStatus
        }
    }

    render() {
        return <IndexPage isBusy={this.state.isBusy}/>;
    }
}

const app = ReactDOM.render(<App />, document.getElementById('app'));

export function update(state) {
    app.setState(state);
}
