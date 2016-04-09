import { scheduleJob } from 'node-schedule';
import { getAll as getAllRooms } from './rooms';
import { emit } from './webSocket';

/*
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── OPTIONAL: second (0 - 59)
 */


scheduleJob('0 0 * * *', () => {
    console.log('Executing task at midnight');
    getAllRooms().forEach(room => {
        room._calcTodayEvents();
        emit('roomUpdated', room._toJson());
    });
});
