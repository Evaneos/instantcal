/* Doc here: https://developers.google.com/google-apps/calendar/quickstart/nodejs */
import { calendar as googleCalendar, auth as googleAuth } from 'googleapis';

const scopes = [
    'https://www.googleapis.com/auth/calendar.readonly',
];


const key = require('../../local/instantcal.json');
const jwtClient = new googleAuth.JWT(key.client_email, null, key.private_key, scopes, null);
export const calendarApi = googleCalendar('v3');

let _authenticated = false;

function authenticate() {
    if (_authenticated) {
        return Promise.resolve();
    }

    _authenticated = true;
    return new Promise((resolve, reject) => {
        jwtClient.authorize((err, tokens) => {
            if (err) {
                return reject(err);
            }

            // console.log(tokens);
            resolve();
        });
    });
}

export function ask(method, params, retryCount = 2) {
    return authenticate().then(() => {
        params.auth = jwtClient;
        return new Promise((resolve, reject) => {
            method(params, (err, response) => {
                if (err) {
                    return reject(err);
                }

                return resolve(response);
            });
        });
    });
}

function ucfirst(s) {
    return s[0].toUpperCase() + s.substr(1);
}

const isResourceRegexp = /@resource.calendar.google.com$/;

export function getEvents(calendarId) {
    return ask(calendarApi.events.list, {
        calendarId: calendarId,
        timeMin: (new Date()).toISOString(),
        maxResults: 4,
        maxAttendees: 10,
        singleEvents: true,
        orderBy: 'startTime',
    })
    .then(({ items }) => {
        return items.map(item => ({
            id: item.id,
            summary: item.summary,
            description: item.description,
            attendees: item.attendees && item.attendees
                .filter(a => !isResourceRegexp.test(a.email))
                .map(a => ({
                    name: ucfirst(a.email.replace(/@evaneos.com$/, '')),
                    email: a.email,
                    responseStatus: a.responseStatus, // needsAction, accepted
                    symbol: (() => {
                        switch (a.responseStatus) {
                            case 'accepted':
                                return '✔';
                            case 'needsAction':
                                return '?';
                            default:
                                return '✖';
                        }
                    })(),
                }))
                .sort((a, b) => a.name.localeCompare(b.name)),
            status: item.status,
            startDate: new Date(item.start.dateTime),
            endDate: new Date(item.end.dateTime),
            updatedDate: new Date(item.updated),
        }));
    });
    // .catch((err) => console.log(err.stack));
}

// const eventMap = new WeakMap();

// https://developers.google.com/google-apps/calendar/v3/push
export function registerWatch(calendar) {
    let calendarId;
    return ask(calendarApi.events.watch, {
        // id:
        calendarId: calendarId,
        type: 'web_hook',
        address: '',
    });
}
