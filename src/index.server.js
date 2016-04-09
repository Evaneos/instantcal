import Koa from 'koa';
import serve from 'koa-static';
import errorsParser from 'alouette';
import argv from './server/argv';
import ErrorHtmlRenderer from 'alouette/lib/HtmlRenderer';
const errorHtmlRenderer = new ErrorHtmlRenderer();
import { watch as watchForNewEvents } from './server/rooms';
import { ConsoleLogger, LogLevel } from 'nightingale';
import './server/scheduledTasks';

const app = new Koa();
app.experimental = true;

app.on('error', err => {
    errorsParser.log(err);
});

// actions
import indexAction from './server/actions/index';

const logger = new ConsoleLogger('app', LogLevel.ALL);
const port = argv.port || 3015;

process.on('uncaughtException', (err) => {
    try {
        errorsParser.log(err);
    } catch (err2) {
        console.error(err.stack);
        console.error(err2.stack);
    }
});

watchForNewEvents();

app.use(serve(`${__dirname}/../public`));

app.use(async function(ctx, next) {
    try {
        await next();
    } catch (err) {
        ctx.status = 500;
        errorsParser.log(err);
        if (argv.production) {
            ctx.body = `Error: ${err.message}`;
        } else {
            ctx.body = errorHtmlRenderer.render(err);
        }
    }
});

app.use(indexAction);

app.listen(port, () => {
    logger.info('listening', { port: port });
});
