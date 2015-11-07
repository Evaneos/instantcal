import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
//import Router from 'react-routing/src/Router';
import IndexPage from '../../components/IndexPage';
import Html from '../../components/Html';
import withContext from '../../decorators/withContext';
import { getRoom, getAllRoomsExcept } from '../rooms';
import { webSocketPort } from '../webSocket'

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

const router = {
    dispatch({ context, room }) {
        return {
            component: <App context={context}><IndexPage room={room} /></App>
        }
    }
};


export const route = '/:room';

export async function action(req, res, next) {
    try {
        const roomName = req.params.room;
        const room = getRoom(roomName);

        if (!room) {
            res.end('room not found');
            return;
        }

        const otherRooms = getAllRoomsExcept(room);

        let statusCode = 200;
        const data = {
            title: '',
            description: '',
            css: '',
            body: '',

            hostname: req.hostname,
            webSocketPort: webSocketPort,
            room: room,
            otherRooms: otherRooms,
        };

        const css = [];
        const context = {
            onInsertCss: value => css.push(value),
            onSetTitle: value => data.title = value,
            onSetMeta: (key, value) => data[key] = value,
            onPageNotFound: () => statusCode = 404,
        };

        const { state, component } = router.dispatch({ path: req.path, context, room, otherRooms });
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        res.status(statusCode).send('<!doctype html>\n' + html);
    } catch (err) {
        next(err);
    }
}
