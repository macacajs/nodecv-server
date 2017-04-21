'use strict';

const path = require('path');
const nodecv = require('nodecv');

const upload_dir = path.join(__dirname, '..', '..', 'upload');

const handle = function(filePaths) {
  return new Promise(resolve => {
    const image1path = path.join(upload_dir, filePaths[0].name);
    const image2path = path.join(upload_dir, filePaths[1].name);
    nodecv.imread(image1path, function(err, image1) {
      nodecv.imread(image2path, function(err, image2) {
        nodecv.imageDissimilarity(image1, image2, (err, dissimilarity) => {
          resolve(dissimilarity);
        });
      });
    });
  });
};

module.exports = function *() {
  var files = this.req.files;
  var filePaths = [files.image1, files.image2];

  try {
    const dissimilarity = yield handle(filePaths);

    if (filePaths.length) {
      this.body = {
        dissimilarity: dissimilarity,
        urls: filePaths
      };
    }
  } catch (e) {
    console.log(e);
  }
};
