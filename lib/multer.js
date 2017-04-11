'use strict';

const thenify = require('thenify');
const originalMulter = require('multer');

module.exports = function multerWrapper(options) {
  const middleware = thenify(originalMulter(options));

  return multer;
  function *multer(next) {
    yield middleware(this.req, this.res);
    this.request.body = this.req.body;
    yield next;
  }
};
