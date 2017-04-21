'use strict';

const fs = require('fs');
const path = require('path');
const render = require('microtemplate').render;

const pkg = require('../../package.json');

const nodecvPkgPath = require.resolve('nodecv');
const nodecvVersion = path.join(nodecvPkgPath, '..', 'package.json');

const getRouter = (rootRouter) => {
  var dist = rootRouter.stack;
  var res = [];
  dist.forEach(router => {
    res.push(`${router.path} (${router.methods.join('|')})`);
  });
  res = res.join('<br/>');
  return res;
};

module.exports = function *(next) {
  const routes = getRouter(this.rootRouter);
  const demoPageHtmlFile = path.join(__dirname, '..', 'demo.html');
  const html = fs.readFileSync(demoPageHtmlFile, 'utf8');
  this.body = render(html, {
    pkg: pkg,
    routes: routes,
    nodecvPkg: require(nodecvVersion)
  }, {
    tagOpen: '<#',
    tagClose: '#>'
  });
  yield next;
};
