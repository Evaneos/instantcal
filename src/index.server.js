import Koa from 'koa';
import serve from 'koa-static';
import convert from 'koa-convert';
import errorParser from 'alouette';
import argv from './server/argv';
const errorsParser = require('alouette');
import ErrorHtmlRenderer from 'alouette/lib/HtmlRenderer';
const errorHtmlRenderer = new ErrorHtmlRenderer();
const config = require('../config.js');
import { watch as watchForNewEvents } from './server/rooms';
import { ConsoleLogger, LogLevel } from 'nightingale';

const app = new Koa();
app.experimental = true;

app.on('error', function(err) {
    errorsParser.log(err);
});

// actions
import indexAction from './server/actions/index';

const logger = new ConsoleLogger('app', LogLevel.ALL);
const port = argv.port || 3015;
const webSocketPort = argv.webSocketPort || 3016;

process.on('uncaughtException', function(err) {
    try {
        errorsParser.log(err);
    } catch (err2) {
        console.error(err.stack);
        console.error(err2.stack);
    }
});

watchForNewEvents();

app.use(convert(serve(__dirname + '/../public')));

app.use(async function(ctx, next) {
    try {
        await next();
    } catch (err) {
        ctx.status = 500;
        errorsParser.log(err);
        if (argv.production) {
            ctx.body = 'Error: ' + err.message;
        } else {
            ctx.body = errorHtmlRenderer.render(err);
        }
    }
});

app.use(indexAction);

app.listen(port, () => {
    logger.info('listening', { port: port });
});
