import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import withContext from '../decorators/withContext';
import Html from '../components/Html';

@withContext
class App extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    };
    static contextTypes = {
        onInsertCss: PropTypes.func
    };


    render() {
        return this.props.children;
    }
}

export default function renderHtml({Component, data, htmlData}) {
    htmlData = Object.assign({
        title: '',
    }, htmlData);

    const context = {
        onSetTitle: value => data.title = value,
        onSetMeta: (key, value) => data[key] = value,
    };


    htmlData.body = ReactDOM.renderToString(<App context={context}><Component {...data} /></App>);
    const html = ReactDOM.renderToStaticMarkup(<Html {...htmlData} />);
    return '<!doctype html>\n' + html;
}
