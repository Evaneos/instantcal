import React, {PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
//import Router from 'react-routing/src/Router';
import indexPage from '../../components/indexpage';
import Html from '../../components/Html';
import withContext from './withContext';

@withContext
class App extends React.Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    render() {
        return this.props.children;
    }
}
//
//const router = new Router(on => {
//    on('*', async (state, next) => {
//        const component = await next();
//        return component && <App context={state.context}>{component}</App>;
//    });
//});

const router = {
    dispatch({ context }) {
        return {
            component: <App context={context}><IndexPage /></App>
        }
    }
};

export default function index(req, res, next) {
    try {
        let statusCode = 200;
        const data = {title: '', description: '', css: '', body: ''};
        const css = [];
        const context = {
            onInsertCss: value => css.push(value),
            onSetTitle: value => data.title = value,
            onSetMeta: (key, value) => data[key] = value,
            onPageNotFound: () => statusCode = 404,
        };

        const { state, component } = router.dispatch({ path: req.path, context });
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');

        const html = ReactDom.renderToStaticMarkup(<Html {...data} />);
        res.status(statusCode).send('<!doctype html>\n' + html);
    } catch (err) {
        next(err);
    }
}
