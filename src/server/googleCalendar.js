/* Doc here: https://developers.google.com/google-apps/calendar/quickstart/nodejs */
import { googleCalendar as googleCalendarConfig } from '../../config';

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

export async function isBusy() {
    const events = await getEvents();
    return events && events.length && events[0].startDate.getTime() < Date.now() || false;
}

export function getEvents() {
    return ask(calendarApi.events.list, {
        calendarId: 'evaneos.com_cl7v6mtsfuh4lq7r4vrgt0faqs@group.calendar.google.com',
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


