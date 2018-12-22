import devConfig from './development.config.js';
import productionConfig from './production.config.js';

const env = process.env.APP_ENV || 'development';

const config = {
  development: devConfig,
  production: productionConfig
};

export default config[env];
