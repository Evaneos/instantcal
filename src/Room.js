var slugify = require('transliteration').slugify;

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
        this._slug = slugify(name);
        this._calendarId = calendarId;
    }

    _updateEvents(events) {
        const _currentEvent = this._currentEvent, _nextEvents = this._nextEvents;
        if (!events.length) {
            this._busy = false;
            this._busySoon = false;
            this._currentEvent = null;
            this._nextEvents = null;
        } else {
            if (events[0].startDate.getTime() < Date.now()) {
                this._currentEvent = events[0];
                this._nextEvents = events.slice(1);
                this._busy = true;
                this._busySoon = null;
            } else {
                this._currentEvent = null;
                this._nextEvents = events;
                this._busy = false;
                this._busySoon = this.nextEvent && this.nextEvent.startDate.getTime() < (Date.now() + 600000);
            }
        }

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

    _fromJson(json) {
        Object.assign(this, json);
    }

    _toJson() {
        return {
            _name: this._name,
            _slug: this._slug,
            _busy: this._busy,
            _busySoon: this._busySoon,
            _currentEvent: this._currentEvent,
            _nextEvents: this._nextEvents,
        }
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

    get isBusy() {
        return this._busy;
    }

    get isBusySoon() {
        return this._busySoon;
    }
}
