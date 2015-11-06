import { create } from './browser/webSocket';
create();
window.webSocket = require('./browser/webSocket');
