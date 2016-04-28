export default function transformRoom(room) {
    return {
        name: room.name,
        slug: room.slug,
        busy: room.isBusy,
        busySoon: room.isBusySoon,
        availableSoon: room.isAvailableSoon,
    };
}
