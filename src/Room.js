function checkIsDifferent(event1, event2) {
    if (event1 && event2) {
        if (event1.id !== event2.id) {
            return true;
        }

        if (event1.updatedDate.getTime() !== event2.updatedDate.getTime()) {
            return true;
        }
    } else if (event1 || event2) {
        return true;
    }

    return false;
}


export default class Room {
    constructor(name, slug, calendarId) {
        this._name = name;
        this._slug = slug;
        this._calendarId = calendarId;
    }

    _updateEvents(events) {
        const { _currentEvent, _nextEvents } = this;
        if (!events.length) {
            this._busy = false;
            this._busySoon = false;
            this._currentEvent = null;
            this._nextEvents = null;
            this._availableSoon = false;
        } else {
            if (events[0].startDate.getTime() < Date.now()) {
                this._currentEvent = events[0];
                this._nextEvents = events.slice(1);
                this._busy = true;
                this._busySoon = null;
                this._availableSoon = this.currentEvent.endDate.getTime() < (Date.now() + 600000)
                    && (!this.nextEvents[0] || this.nextEvents[0].startDate.getTime() > (Date.now() + 600000));
            } else {
                this._currentEvent = null;
                this._nextEvents = events;
                this._busy = false;
                this._busySoon = this.nextEvent && this.nextEvent.startDate.getTime() < (Date.now() + 600000);
                this._availableSoon = false;
            }
        }

        this._calcTodayEvents();

        if (checkIsDifferent(_currentEvent, this._currentEvent)) {
            return true;
        }

        if (_nextEvents && this._nextEvents) {
            if (_nextEvents.length !== this._nextEvents.length) {
                return true;
            }

            return _nextEvents.some((event, index) => {
                return checkIsDifferent(event, this._nextEvents[index]);
            });
        } else if (_nextEvents || this._nextEvents) {
            return true;
        }

        return false;
    }

    _calcTodayEvents() {
        const todayString = new Date().toDateString();
        this._todayNextEvents = this._nextEvents && this._nextEvents.filter(e => e.startDate.toDateString() == todayString);
        const nextEvent = this.nextEvent;
        this._nextEventIsToday = nextEvent && nextEvent.startDate.toDateString() == todayString;
    }

    _fromJson(json) {
        Object.assign(this, {
            _name: json._name,
            _slug: json._slug,
            _busy: json._busy,
            _busySoon: json._busySoon,
            _availableSoon: json._availableSoon,
            _currentEvent: json._currentEvent && this._eventFromJson(json._currentEvent),
            _nextEvents: json._nextEvents && json._nextEvents.map(e => this._eventFromJson(e)),

        });
        this._calcTodayEvents();
    }

    _eventFromJson(event) {
        return Object.assign({}, event, {
            startDate: event.startDate && new Date(event.startDate),
            endDate: event.endDate && new Date(event.endDate),
        });
    }

    _toJson() {
        return {
            _name: this._name,
            _slug: this._slug,
            _busy: this._busy,
            _busySoon: this._busySoon,
            _availableSoon: this._availableSoon,
            _currentEvent: this._currentEvent,
            _nextEvents: this._nextEvents,
        };
    }

    get name() {
        return this._name;
    }

    get slug() {
        return this._slug;
    }

    get calendarId() {
        return this._calendarId;
    }

    get currentEvent() {
        return this._currentEvent;
    }

    get nextEvent() {
        return this._nextEvents && this._nextEvents[0];
    }

    get nextEvents() {
        return this._nextEvents;
    }

    get todayNextEvent() {
        return this._nextEventIsToday ? this.nextEvent : null;
    }

    get todayNextEvents() {
        return this._todayNextEvents;
    }

    get isBusy() {
        return this._busy;
    }

    get isBusySoon() {
        return this._busySoon;
    }

    get isAvailableSoon() {
        return this._availableSoon;
    }
}
