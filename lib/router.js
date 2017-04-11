'use strict';

const os = require('os');
const Router = require('koa-router');

const multer = require('./multer');
const _ = require('./common/helper');
const pkg = require('../package.json');
const logger = require('./common/logger');
const demoController = require('./controllers/demo');
const dissimilarityController = require('./controllers/dissimilarity');
const matchtemplateController = require('./controllers/matchtemplate');
const cascadedetectController = require('./controllers/cascadedetect');

var upload = multer({
  dest: 'upload/'
});

const rootRouter = new Router();

module.exports = function(app) {
  rootRouter.get('/', function *(next) {
    var dist = rootRouter.stack;
    var res = [];
    dist.forEach(router => {
      res.push(`${router.path}#[${router.methods.join('|')}]`);
    });
    var temp = _.sortBy(res, string => {
      return string.length;
    });
    var num = temp[temp.length - 1].length;
    res.forEach((router, i) => {
      res[i] = router.replace('#', new Array(num - router.length + 2).join(' '));
    });
    res.unshift([`${pkg.name}@${pkg.version}`], new Array(num + 1).join('-'), '');
    this.body = res.join(os.EOL);
    yield next;
  });

  rootRouter.get('/opencv/demo', demoController);

  rootRouter.post('/opencv/dissimilarity', upload, dissimilarityController);

  rootRouter.post('/opencv/matchtemplate', upload, matchtemplateController);

  rootRouter.post('/opencv/cascadedetect', upload, cascadedetectController);

  app.use(rootRouter.routes());
  logger.debug('router set');
};
