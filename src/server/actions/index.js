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
    dispatch({ context, room, otherRooms }) {
        return {
            component: <App context={context}><IndexPage room={room} otherRooms={otherRooms} /></App>
        }
    }
};


export default async function action(ctx) {
    const roomName = ctx.path.trim().replace(/^\/+/, '');
    const room = getRoom(roomName);

    if (!room) {
        ctx.body = 'room not found';
        ctx.status = 404;
        return;
    }

    const otherRooms = getAllRoomsExcept(room);

    let statusCode = 200;
    const data = {
        title: '',
        description: '',
        css: '',
        body: '',

        hostname: ctx.hostname,
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

    const { state, component } = router.dispatch({ context, room, otherRooms });
    data.body = ReactDOM.renderToString(component);
    data.css = css.join('');
    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    ctx.status = statusCode;
    ctx.body = '<!doctype html>\n' + html;
}
