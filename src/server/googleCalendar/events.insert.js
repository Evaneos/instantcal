import { authenticateAndFetch, calendar } from './api';
import eventTransformer, { toGoogleCalendarEvent } from './eventTransformer';
import Logger from 'nightingale';

const logger = new Logger('app.googleCalendar.events.insert');

export default function eventsList(calendarId, event) {
    event = toGoogleCalendarEvent(event);
    logger.info('addEvent', { calendarId, event });
    return authenticateAndFetch(calendar.events.insert, { calendarId, resource: event })
        .then((item) => eventTransformer(item));
}
