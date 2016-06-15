export default async function displayApiDoc(ctx) {
    ctx.body = {
        title: 'Instantcal API documentation',
        urls: [
            {
                method: 'GET',
                url: '/rooms',
                description: 'List all rooms',
            },
            {
                method: 'GET',
                url: '/rooms/search',
                params: { name: { type: 'string', description: 'Name of the room you want to find' } },
                description: 'Search a room',
            },
            {
                method: 'GET',
                url: '/rooms/${roomName}',
                namedParams: { roomName: { type: 'string', description: 'Slug of the room' } },
                description: 'Display room data',
            },
            {
                method: 'GET',
                url: '/rooms/${roomName}/book',
                description: 'Book room, returns 400 if not available',
            },
        ],
    };
}
