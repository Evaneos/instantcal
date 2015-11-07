/* Doc here: https://developers.google.com/google-apps/calendar/quickstart/nodejs */
import { calendars } from '../../config';

import { calendar as googleCalendar, auth as googleAuth } from 'googleapis';

const scopes = [
    'https://www.googleapis.com/auth/calendar.readonly',
];


const key = require('../../local/instantcal.json');
const jwtClient = new googleAuth.JWT(key.client_email, null, key.private_key, scopes, null);
const calendarApi = googleCalendar('v3');


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

            console.log(tokens);
            resolve();
        });
    });
}

function ask(method, params, retryCount = 2) {
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

export function getEvents(calendarId) {
    return ask(calendarApi.events.list, {
        calendarId: calendarId,
        timeMin: (new Date()).toISOString(),
        maxResults: 2,
        singleEvents: true,
        orderBy: 'startTime',
    })
    .then(({ items }) => {
        return items.map(item => ({
            id: item.id,
            status: item.status,
            startDate: new Date(item.start.dateTime),
            endDate: new Date(item.end.dateTime),
        }));
    });
    //.then((items) => console.log(items))
    //.catch((err) => console.log(err.stack));
};

// https://developers.google.com/google-apps/calendar/v3/push
export function registerWatch(calendar) {
    return ask(calendarApi.events.watch, {
        // id:
        calendarId: calendarId,
        type: 'web_hook',
        address: '',
    });
}
