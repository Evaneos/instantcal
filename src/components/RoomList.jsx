import React, { Component, PropTypes } from 'react';
import Room from './Room/Room';

export default class RoomList extends Component {
    static propTypes = {
        rooms: PropTypes.array.isRequired,
    };

    render() {
        const length = this.props.rooms.length;
        return (<div className="room-list-container">
            <ul className="room-list">
                { this.props.rooms.map((room, index) =>
                    <li style={{ height: (length ===1 ? 100 : (index === 0 ? 40 : 60/(length-1)))+'%' }}
                        key={room.name}>
                        <Room firstMainRoom={ index === 0 } room={room} />
                    </li>
                ) }
            </ul>
        </div>)
    }
}
