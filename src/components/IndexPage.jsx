import React, { Component, PropTypes } from 'react';
import RoomList from './RoomList';
import RoomPreviewList from './RoomPreviewList';

export default class IndexPage extends Component {
    static propTypes = {
        rooms: PropTypes.array.isRequired,
        mainRoomName: PropTypes.string.isRequired,
        otherRoomNames: PropTypes.array.isRequired,
    };

    render() {
        const {rooms, mainRoomName, otherRoomNames} = this.props;
        const title = mainRoomName ? `Room ${mainRoomName}` : 'Rooms';
        return (
            <div className={`page-container${mainRoomName?'':' no-main-room'}${otherRoomNames.length?'':' no-other-rooms'}`}>
                <div className="preview-rooms-container">
                    <RoomPreviewList rooms={rooms} mainRoomName={mainRoomName} otherRoomNames={otherRoomNames} />
                </div>
                <div className="highlighted-rooms-container">
                    <RoomList rooms={rooms} mainRoomName={mainRoomName} otherRoomNames={otherRoomNames} />
                </div>
            </div>
        );
    }
}
