import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import IndexPage from '../components/IndexPage';

class App extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    render() {
        return this.props.children;
    }
}


const indexPage = <IndexPage isBusy={false} />;
const app = ReactDOM.render(<App>{ indexPage }</App>, document.getElementById('app'));
console.log(app.setState);
