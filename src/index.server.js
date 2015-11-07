import express from 'express';
import errorParser from 'alouette';
const app = express();
const basicAuth = require('basic-auth');
const cookieParser = require('cookie-parser');
import argv from './server/argv';
const errorsParser = require('alouette');
import ErrorHtmlRenderer from 'alouette/lib/HtmlRenderer';
const errorHtmlRenderer = new ErrorHtmlRenderer();
const config = require('../config.js');
import { watch as watchForNewEvents } from './server/rooms';
import { ConsoleLogger, LogLevel } from 'nightingale';

// actions
import * as indexAction from './server/actions/index';

const logger = new ConsoleLogger('app', LogLevel.ALL);
const port = argv.port || 3015;
const webSocketPort = argv.webSocketPort || 3006;

process.on('uncaughtException', function(err) {
    try {
        errorsParser.log(err);
    } catch (err2) {
        console.error(err.stack);
        console.error(err2.stack);
    }
});

watchForNewEvents();

app.use(express.static(__dirname + '/../public'));

app.use(function(err, req, res, next) {
    errorsParser.log(err);
    if (argv.production) {
        res.status(500).send('Error: ' + err.message);
    } else {
        res.status(500).send(errorHtmlRenderer.render(err));
    }
});

app.get(indexAction.route, indexAction.action);

app.listen(port, () => {
    logger.info('listening', { port: port });
});
