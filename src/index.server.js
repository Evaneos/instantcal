import Koa from 'koa';
import serve from 'koa-static';
import argv from './server/argv';
import errors from 'alp-errors-node';
import router from 'alp-limosa';
import { watch as watchForNewEvents } from './server/rooms';
import Logger from 'nightingale';
import './server/scheduledTasks';
import './server/loggers';
import { init as websocket } from './server/webSocket';
import config from './server/config';

// actions
import routerBuilder from './server/routerBuilder';
import controllers from './server/controllers';

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

app.use(errors);

const routerHandler = router(routerBuilder, controllers)(app);
app.use(routerHandler);

app.listen(port, () => {
    logger.info('listening', { port: port });
});

websocket(app);
