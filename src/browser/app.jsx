import React, { Component, PropTypes } from 'react';
import Room from '../Room';
import ReactDOM from 'react-dom';
import IndexPage from '../components/IndexPage';

class App extends Component {
    static childContextTypes = {
        kiosk: PropTypes.bool,
        noninteractive: PropTypes.bool,
    };

    constructor() {
        super();
        this.state = {
            rooms: window.rooms.map(r => {
                const room = new Room();
                room._fromJson(r);
                return room;
            }),
            mainRoomName: window.mainRoomName,
            otherRoomNames: window.otherRoomNames,
        };
    }

    getChildContext() {
        return {
            kiosk: window.KIOSK,
            noninteractive: window.NONINTERACTIVE,
        };
    }

    render() {
        return (<IndexPage
            rooms={this.state.rooms}
            mainRoomName={this.state.mainRoomName}
            otherRoomNames={this.state.otherRoomNames}
        />);
    }
}

const app = ReactDOM.render(<App />, document.getElementById('app'));

export function update({ room }) {
    const rooms = app.state.rooms.map(mainRoom => (
        mainRoom.name === room.name ? room : mainRoom
    ));
    app.setState({ rooms });
}
