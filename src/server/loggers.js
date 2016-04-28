import { configure } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

configure([
    {
        handlers: [new ConsoleHandler()],
    },
]);
