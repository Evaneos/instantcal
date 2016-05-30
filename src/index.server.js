import Koa from 'koa';
import serve from 'koa-static';
import argv from './server/argv';
import errors from 'alp-errors-node';
import { watch as watchForNewEvents } from './server/rooms';
import Logger from 'nightingale';
import './server/scheduledTasks';
import './server/loggers';
import { init as websocket } from './server/webSocket';
import config from './server/config';

// actions
import indexAction from './server/actions/index';
import apiAction from './server/actions/api';

const logger = new Logger('app');

const port = argv.port || 3015;
const app = new Koa();
app.config = config;
app.experimental = true;
app.proxy = true;
app.logger = logger;
app.production = app.env === 'prod' || app.env === 'production';

process.on('uncaughtException', err => logger.error('uncaughtException', { err }));
app.on('error', err => logger.error('koa error', { err }));

watchForNewEvents();

app.use(serve(`${__dirname}/../public`));

app.use(async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        logger.error(err);
    }
});
app.use(errors);
app.use(apiAction);
app.use(indexAction);

app.listen(port, () => {
    logger.info('listening', { port: port });
});
websocket(app);
