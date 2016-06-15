import apiController from './api';
import siteController from './site';

const controllers = new Map([
    ['site', siteController],
    ['api', apiController],
]);

export default controllers;
