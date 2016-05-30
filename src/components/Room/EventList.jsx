import React, { Component, PropTypes } from 'react';
import Event from '../Event';
import cx from 'classnames';
import { bookRoom } from '../../websocket';

export default class EventListComponent extends Component {
    static propTypes = {
        room: PropTypes.object,
        currentEvent: PropTypes.object,
        nextEvents: PropTypes.array,
    };

    static contextTypes = {
        kiosk: PropTypes.bool,
        noninteractive: PropTypes.bool,
    };

    state = {
        displayButton: true,
    };

    render() {
        const { room, currentEvent, nextEvents } = this.props;
        const { noninteractive } = this.context;
        const { displayButton } = this.state;

        if (!currentEvent && (!nextEvents || !nextEvents.length)) {
            return (<div className="no-events">
                <div>{noninteractive || !displayButton ? 'Salle libre' : <button
                    onClick={() => {
                    this.setState({ displayButton: false });
                    bookRoom(room).then(() => {
                        this.setState({ displayButton: true });
                        alert('Youhouhou');
                    });
                }}
                >Réserver pour 30 minutes</button>}</div>
            </div>);
        }

        const currentEventClassname = cx('current-event', {
            'has-next-events': !!(nextEvents && nextEvents.length),
        });

        return (<div className="events">
            <div className={currentEventClassname}>
                <Event event={currentEvent} currentEvent />
            </div>
            {!nextEvents ? '' : <div className="next-events">
                <ul className="event-list">
                    {nextEvents.map((nextEvent, index) => {
                        return (<li key={`nextEvent${index}`} className="event">
                            <Event event={nextEvent} currentEvent={false} />
                        </li>);
                    })}
                </ul>
            </div>}
        </div>);
    }
}
