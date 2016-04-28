/* Doc here: https://developers.google.com/google-apps/calendar/quickstart/nodejs */
import { auth as googleAuth } from 'googleapis';
// import GoogleAuth from 'google-auth-library';
import Logger from 'nightingale';

const logger = new Logger('app.googleCalendar.auth');

const scopes = [
    'https://www.googleapis.com/auth/calendar',
];


const key = require('../../../local/instantcal.json');
const jwtClient = new googleAuth.JWT(key.client_email, null, key.private_key, scopes, null);

let _authenticated = false;

export default function authenticate() {
    if (_authenticated) {
        return Promise.resolve(jwtClient);
    }

    _authenticated = true;
    return new Promise((resolve, reject) => {
        jwtClient.authorize((err, tokens) => {
            if (err) {
                logger.error(err);
                return reject(err);
            }

            logger.success('authenticated');
            // console.log(tokens);
            resolve(jwtClient);
        });
    });
}
