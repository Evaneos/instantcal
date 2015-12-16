import React, { Component, PropTypes } from 'react';
import Room from '../Room';
import ReactDOM from 'react-dom';
import IndexPage from '../components/IndexPage';

class App extends Component {
    constructor() {
        super();
        this.state = {
            rooms: window.rooms.map(r => {
                const room = new Room();
                room._fromJson(r);
                return room;
            }),
            otherRooms: window.otherRooms.map(r => {
                const room = new Room();
                room._fromJson(r);
                return room;
            }),
        }
    }

    render() {
        return <IndexPage rooms={this.state.rooms} otherRooms={this.state.otherRooms} />;
    }
}

const app = ReactDOM.render(<App />, document.getElementById('app'));

export function update({ room }) {
    const rooms = app.state.rooms.map(mainRoom => {
        return mainRoom.name === room.name ? room : mainRoom;
    });

    const otherRooms = app.state.otherRooms.map(otherRoom => {
        return otherRoom.name === room.name ? room : otherRoom;
    });
    app.setState({ rooms, otherRooms });
}
