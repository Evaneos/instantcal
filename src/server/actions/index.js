import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
//import Router from 'react-routing/src/Router';
import IndexPage from '../../components/IndexPage/IndexPage';
import Html from '../../components/Html/Html';
import withContext from '../../decorators/withContext';
import { isBusy } from '../googleCalendar';

@withContext
class App extends Component {
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
    dispatch({ context, availability }) {
        return {
            component: <App context={context}><IndexPage available={availability} /></App>
        }
    }
};

export default async function index(req, res, next) {
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

        //const events = await getEvents();
        const availability = !await isBusy();
        //console.log(availability);
        //const availability = true;
        const { state, component } = router.dispatch({ path: req.path, context, availability });
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');

        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        res.status(statusCode).send('<!doctype html>\n' + html);
    } catch (err) {
        next(err);
    }
}
