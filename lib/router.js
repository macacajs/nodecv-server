'use strict';

const Router = require('koa-router');

const multer = require('./multer');
const logger = require('./common/logger');
const demoController = require('./controllers/demo');
const findpairsController = require('./controllers/findpairs');
const dissimilarityController = require('./controllers/dissimilarity');
const matchtemplateController = require('./controllers/matchtemplate');
const cascadedetectController = require('./controllers/cascadedetect');

const upload = multer({
  dest: 'upload/'
});

const rootRouter = new Router();

module.exports = function(app) {

  rootRouter.get('/', function * (next) {
    this.rootRouter = rootRouter;
    yield next;
  }, demoController);

  rootRouter.post('/opencv/dissimilarity', upload, dissimilarityController);

  rootRouter.post('/opencv/findpairs', upload, findpairsController);

  rootRouter.post('/opencv/matchtemplate', upload, matchtemplateController);

  rootRouter.post('/opencv/cascadedetect', upload, cascadedetectController);

  app.use(rootRouter.routes());
  logger.debug('router set');
};
