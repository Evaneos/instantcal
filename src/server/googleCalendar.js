/* Doc here: https://developers.google.com/google-apps/calendar/quickstart/nodejs */
import { googleCalendar as googleCalendarConfig } from '../../config';

import { calendar as googleCalendar, auth as googleAuth } from 'googleapis';

const scopes = [
    'https://www.googleapis.com/auth/calendar.readonly',
];

const key = require('../../local/instantcal.json');
const jwtClient = new googleAuth.JWT(key.client_email, null, key.private_key, scopes, null);
const calendarApi = googleCalendar('v3');


export function getEvents() {
    (new Promise((resolve, reject) => {
        jwtClient.authorize((err, tokens) => {
            if (err) {
                return reject(err);
            }

            console.log(tokens);
            resolve();
        });
    })).then(auth => {
        return new Promise((resolve, reject) => {
            calendarApi.events.list({
                auth: jwtClient,
                calendarId: 'evaneos.com_64m6813jhu0v00r4j0o3lq388k@group.calendar.google.com',
                timeMin: (new Date()).toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: 'startTime',
            }, (err, response) => {
                if (err) {
                    return reject(err);
                }

                return resolve(response);
            })
        });
    });
    /*.then(({ items }) => {
        if (items.length == 0) {
            console.log('No upcoming events found.');
        } else {
            console.log('Upcoming 10 events:');
            for (var i = 0; i < items.length; i++) {
                var event = items[i];
                var start = event.start.dateTime || event.start.date;
                console.log('%s - %s', start, event.summary);
            }
        }
    })*///.catch((err) => console.log(err.stack));
};
