import { calendar as googleCalendar } from 'googleapis';
import authenticate from './authenticate';
export const calendar = googleCalendar('v3');

export async function authenticateAndFetch(method, params, retryCount = 2) {
    const jwtClient = await authenticate();

    return new Promise((resolve, reject) => {
        method({ ...params, auth: jwtClient }, (err, response) => {
            if (err) {
                return reject(err);
            }

            return resolve(response);
        });
    });
}
