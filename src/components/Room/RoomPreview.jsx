import React, { Component, PropTypes } from 'react';

export default class RoomPreview extends Component {
    static propTypes = {
        room: PropTypes.object.isRequired,
        main: PropTypes.bool,
    };

    render() {
        const room = this.props.room;
        let isBusy = room.isBusy ? 'busy' : (room.isBusySoon ? 'busy-soon' : 'available');
        return (<div className={isBusy + ' room-preview-container'}>
            <div className="room">
                <div className="room-info">
                    <div className="name">{room.name}</div>
                </div>
            </div>
        </div>)
    }
}
