'use strict';

const path = require('path');
const nodecv = require('nodecv');

const upload_dir = path.join(__dirname, '..', '..', 'upload');

const handle = function(filePaths) {
  return new Promise(resolve => {
    const image1path = path.join(upload_dir, filePaths[0].url);
    const image2path = path.join(upload_dir, filePaths[1].url);
    nodecv.imread(image1path, function(err, image1) {
      nodecv.imread(image2path, function(err, image2) {
        nodecv.findPairs(image1, image2, (err, match) => {
          resolve(match);
        });
      });
    });
  });
};

module.exports = function *() {
  var files = this.req.files;

  let filePaths = [];
  Object.keys(files).forEach(key => {
    const item = files[key];
    filePaths.push({
      name: item.originalname,
      url: item.name
    });
  });

  try {
    const match = yield handle(filePaths);
    if (filePaths.length) {
      this.body = {
        match: match,
        urls: filePaths
      };
    }
  } catch (e) {
    console.log(e);
  }
};

