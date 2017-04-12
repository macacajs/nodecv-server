'use strict';

const koa = require('koa');
const cors = require('koa-cors');
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const staticMiddleware = require('koa-static');

const logger = require('./common/logger');

exports.server = options => {
  const router = require('./router');
  const middlewares = require('./middlewares');

  const app = koa();

  app.use(cors());

  app.use(bodyParser());

  app.use(staticMiddleware('static'));

  app.use(staticMiddleware('upload'));

  middlewares(app);

  router(app);

  app.use(koaLogger());

  app.listen(options.port, () => {
    logger.info(`nodecv server start: ${options.port}`);
  });
};
