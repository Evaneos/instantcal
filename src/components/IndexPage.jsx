import React, { Component, PropTypes } from 'react';
import RoomList from './RoomList';
import RoomPreviewList from './RoomPreviewList';

export default class IndexPage extends Component {
    static propTypes = {
        rooms: PropTypes.array.isRequired,
        otherRooms: PropTypes.array.isRequired,
    };

    render() {
        const mainRooms = this.props.rooms;
        const title = `Room${mainRooms.length > 1 ? 's' : ''}`
            + ` ${mainRooms.map(r => r.name).join(', ')}`;
        return (
            <div className="page-container">
                <div className="preview-rooms-container">
                    <RoomPreviewList rooms={this.props.otherRooms} mainRooms={mainRooms} />
                </div>
                <div className="main-rooms-container">
                    <RoomList rooms={mainRooms} />
                </div>
            </div>
        );
    }
}
