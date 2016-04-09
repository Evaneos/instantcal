import React, { PropTypes } from 'react';

RoomPreview.propTypes = {
    room: PropTypes.object.isRequired,
    main: PropTypes.bool,
};

export default function RoomPreview({ room }) {
    let isBusy = room.isBusy ? 'busy' : (room.isBusySoon ? 'busy-soon' : 'available');
    return (<div className={`${isBusy} room-preview-container`}>
        <div className="room">
            <div className="room-info">
                <div className="name">{room.name}</div>
            </div>
        </div>
    </div>);
}
