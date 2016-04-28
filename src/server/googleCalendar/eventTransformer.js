const isResourceRegexp = /@resource.calendar.google.com$/;
const ucfirst = s => s[0].toUpperCase() + s.substr(1);

export default function eventTransformer(item) {
    return {
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
    };
}

export function toGoogleCalendarEvent(event) {
    return {
        summary: event.summary,
        description: event.description,
        attendees: event.attendees && event.attendees
            .map(a => ({
                email: a.email,
                responseStatus: a.responseStatus,
            })),
        start: {
            dateTime: event.startDate.toISOString(),
        },
        end: {
            dateTime: event.endDate.toISOString(),
        },
    };
}
