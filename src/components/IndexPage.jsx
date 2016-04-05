import React, { Component, PropTypes } from 'react';
import RoomList from './RoomList';
import RoomPreviewList from './RoomPreviewList';
import classnames from 'classnames';

export default class IndexPage extends Component {
    static propTypes = {
        rooms: PropTypes.array.isRequired,
        mainRoomName: PropTypes.string,
        otherRoomNames: PropTypes.array.isRequired,
    };

    render() {
        const {rooms, mainRoomName, otherRoomNames} = this.props;
        const title = mainRoomName ? `Room ${mainRoomName}` : 'Rooms';
        return (
            <div className={classnames('page-container', {
                'no-main-room': mainRoomName,
                'no-other-rooms': otherRoomNames.length,
            })}>
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
