import React, { Component, PropTypes } from 'react';
import RoomPreview from './Room/RoomPreview';

export default class RoomPreviewList extends Component {
    static propTypes = {
        rooms: PropTypes.array.isRequired,
        mainRoomName: PropTypes.string,
        otherRoomNames: PropTypes.array.isRequired,
    };

    render() {
        const { rooms, mainRoomName, otherRoomNames} = this.props;
        return (
            <div className="map-container">
                <div className="map">
                    <ul className="room-list">
                        { rooms.map (room => (
                            <li className={room.slug} key={room.name}>
                                <RoomPreview room={room} main={room.name === mainRoomName} />
                            </li>
                        )) }
                        <li className="center" />
                        <li className="toilet toilet1" />
                        <li className="toilet toilet2" />
                        <li className="kitchen" />
                        <li className="shower" />
                    </ul>
                </div>
            </div>
        )
    }
}
