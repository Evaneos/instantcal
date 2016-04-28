import { calendar as googleCalendar } from 'googleapis';
import authenticate from './authenticate';
export const calendar = googleCalendar('v3');

export function authenticateAndFetch(method, params, retryCount = 2) {
    return authenticate().then((jwtClient) => {
        return new Promise((resolve, reject) => {
            method({ ...params, auth: jwtClient }, (err, response) => {
                if (err) {
                    return reject(err);
                }

                return resolve(response);
            });
        });
    });
}
