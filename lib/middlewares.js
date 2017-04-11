'use strict';

const os = require('os');

const pkg = require('../package');
const logger = require('./common/logger');

module.exports = function(app) {
  const string = `${pkg.name}/${pkg.version} node/${process.version}(${os.platform()})`;

  app.use(function *powerby(next) {
    yield next;
    this.set('X-Powered-By', string);
  });

  app.use(logger.middleware);
  logger.debug('base middlewares attached');
};
