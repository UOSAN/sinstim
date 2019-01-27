import devConfig from './development.config';
import productionConfig from './production.config';

const env = process.env.APP_ENV || 'development';

const config = {
    development: devConfig,
    production: productionConfig
};

export default config[env];
