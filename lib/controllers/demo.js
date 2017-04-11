'use strict';

const fs = require('fs');
const path = require('path');

module.exports =function *(next) {
  const demoPageHtmlFile = path.join(__dirname, '..', 'demo.html');
  this.body = fs.readFileSync(demoPageHtmlFile, 'utf8');
  yield next;
};
