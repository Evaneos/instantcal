import React, { Component, PropTypes } from 'react';
import Room from './Room/Room';

export default class RoomList extends Component {
    static propTypes = {
        rooms: PropTypes.array.isRequired,
        mainRoomName: PropTypes.string,
        otherRoomNames: PropTypes.array.isRequired,
    };

    render() {
        const {rooms, mainRoomName, otherRoomNames} = this.props;
        const mainRoom = rooms.find(r => r.name === mainRoomName);
        const otherRooms = otherRoomNames.map(name => rooms.find(r => r.name === name));
        const otherRoomsLength = otherRooms.length;

        return (<div className="room-list-container">
            <ul className="room-list">
                { !mainRoom ? '' :
                <li style={{ width: `${!otherRoomsLength ? 100 : (otherRoomsLength === 1 ? 49 : 39)}%` }}
                    key={mainRoom.name}>
                    <Room firstMainRoom={true} room={mainRoom} />
                </li>}

                { otherRooms.map((room, index) =>
                    <li style={{ width: `${
                        (otherRoomsLength === 1 && !mainRoom ? 100 :
                            otherRoomsLength === 1 && mainRoom ? 49
                            : (100/(otherRoomsLength))
                        )
                    }%` }}
                        key={room.name}>
                        <Room firstMainRoom={false} room={room} />
                    </li>
                ) }
            </ul>
        </div>)
    }
}
