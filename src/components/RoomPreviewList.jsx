import React, { Component, PropTypes } from 'react';
import RoomPreview from './Room/RoomPreview';

export default class RoomPreviewList extends Component {
    static propTypes = {
        rooms: PropTypes.array.isRequired,
        mainRooms : PropTypes.array.isRequired,
    };

    render() {
        return (
            <div className="map-container">
                <div className="map">
                    <ul className="room-list">
                        { this.props.rooms.map(room => <li className={room.slug} key={room.name}><RoomPreview room={room} /></li>) }
                        { this.props.mainRooms.map (room => <li className={room.slug} key={room.name}><RoomPreview room={room} main={true} /></li>) }
                        <li className="stairs"></li>
                        <li className="center"></li>
                    </ul>
                </div>
            </div>
        )
    }
}
