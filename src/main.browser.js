import { create } from './browser/webSocket';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import IndexPage from './components/IndexPage';


class App extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    render() {
        return this.props.children;
    }
}

create();


const app = ReactDOM.render(<App><IndexPage isBusy={isBusy} /></App>, document.getElementById('app'));
