import React, { PropTypes } from 'react';
import calcRoomStatusClass from './calcRoomStatusClass';

RoomPreview.propTypes = {
    room: PropTypes.object.isRequired,
    main: PropTypes.bool,
};

export default function RoomPreview({ room }) {
    return (<div className={`${calcRoomStatusClass(room)} room-preview-container`}>
        <div className="room">
            <div className="room-info">
                <div className="name">{room.name}</div>
            </div>
        </div>
    </div>);
}
