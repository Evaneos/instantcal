import fetchEvents from './events.list';
import insertEvent from './events.insert';

export function getEvents(calendarId) {
    return fetchEvents({
        calendarId: calendarId,
        timeMin: (new Date()).toISOString(),
        maxResults: 4,
        maxAttendees: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });
    // .catch((err) => console.log(err.stack));
}

export function createEvent(calendarId, event) {
    return insertEvent(calendarId, event);
}

// const eventMap = new WeakMap();

// https://developers.google.com/google-apps/calendar/v3/push
// export function registerWatch(calendar) {
//    let calendarId;
//    return ask(calendarApi.events.watch, {
//        // id:
//        calendarId: calendarId,
//        type: 'web_hook',
//        address: '',
//    });
// }
