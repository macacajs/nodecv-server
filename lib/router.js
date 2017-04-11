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
    this.body = `<html><div class="ribbon" style="position:fixed;right:0;top:0;width:150px;height:150px;overflow:hidden;z-index:9999;"><a target="_blank" style="display:inline-block;width:200px;overflow:hidden;padding:6px 0;text-align:center;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);-transform:rotate(45deg);text-decoration:none;color:#fff;position:inherit;top:45px;right:-40px;border-width:1px 0;border-style:dotted;border-color:rgba(255, 255, 255, 0.7);font:700 13px &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;box-shadow:0 2px 3px 0 rgba(0, 0, 0, 0.5);background-color:#a00;" href="//github.com/xudafeng/nodecv-server">Fork me on Github</a></div><pre>${res.join(os.EOL)}</pre></html>`;
    yield next;
  });

  rootRouter.get('/opencv/demo', demoController);

  rootRouter.post('/opencv/dissimilarity', upload, dissimilarityController);

  rootRouter.post('/opencv/matchtemplate', upload, matchtemplateController);

  rootRouter.post('/opencv/cascadedetect', upload, cascadedetectController);

  app.use(rootRouter.routes());
  logger.debug('router set');
};
