import React, { Component, PropTypes } from 'react';
import RoomPreview from './Room/RoomPreview';

export default class RoomList extends Component {
    static propTypes = {
        rooms: PropTypes.array.isRequired,
    };


    render() {
        return (<ul className="room-list">
            { this.props.rooms.map(room => <li key={room.name}><RoomPreview room={room} /></li>) }
        </ul>)
    }
}
