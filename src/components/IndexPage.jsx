import React, { Component, PropTypes } from 'react';
import Room from './Room/Room';
import RoomList from './RoomList';

export default class IndexPage extends Component {
    static propTypes = {
        room: PropTypes.object.isRequired,
        otherRooms: PropTypes.array.isRequired,
    };

    render() {
        console.log(this.props.otherRooms);
        const title = 'Room';
        const mainRoom = this.props.room;
        let mainRoomStatus = mainRoom.isBusy ? 'busy' : (mainRoom.isBusySoon ? 'busy-soon' : 'available');
        return (
            <div className={ mainRoomStatus + ' page-container'}>
                <div className="mainRoom-container">
                    <Room room={this.props.room} />
                </div>
                <div className="otherRooms-container">
                    <RoomList rooms={this.props.otherRooms} />
                </div>
            </div>
        );
    }
}
