import { Config } from 'alp-config';
import packageConfig from '../../package.json';

// trick to get config ASAP. I need to split alp-config

const config = new Config(`${__dirname}/../../config/`);
config.loadSync({
    packageConfig,
    argv: ['webSocket.port'],
});

export default config;
