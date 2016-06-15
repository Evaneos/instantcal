export default function build(builder) {
    builder
        .add('home', '/', 'site.index')
        .addSegment('/api', segment => {
            segment.addSegment('/rooms', segment => {
                segment.add('api/room/search', '/search', 'api.room/search');
                segment.addSegment('/${roomName}', segment => {
                    segment.add('api/room/book', '/book', 'api.room/book');
                    segment.defaultRoute('api/room', 'api.room');
                });
                segment.defaultRoute('api/rooms', 'api.rooms');
            });
            segment.defaultRoute('api/doc', 'api.doc');
        })
        .add('default', '/${roomName}', 'site.index');
}
