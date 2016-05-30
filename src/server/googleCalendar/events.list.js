import { authenticateAndFetch, calendar } from './api';
import eventTransformer from './eventTransformer';

export default function eventsList(params) {
    return authenticateAndFetch(calendar.events.list, params)
        .then(({ items }) => items.map(item => eventTransformer(item)));
}

