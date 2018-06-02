import devConfig from './development.config.js';
import productionConfig from './production.config.js';
import stagingConfig from './staging.config.js';

const env = process.env.APP_ENV || 'development';

const config = {
  development: devConfig,
  production: productionConfig,
  staging: stagingConfig
};

export default config[env];