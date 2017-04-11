'use strict';

const path = require('path');
const nodecv = require('nodecv');

const upload_dir = path.join(__dirname, '..', '..', 'upload');

const handle = function(fileNames) {
  return new Promise(resolve => {
    const color = [0, 0, 255];
    const image1path = path.join(upload_dir, fileNames[0].url);
    const image2path = path.join(upload_dir, fileNames[1].url);
    const outputPath = path.join(upload_dir, 'output.jpg');
    nodecv.imread(image1path, function(err, image1) {
      nodecv.imread(image2path, function(err, image2) {
        var match = nodecv.matchTemplate(image1, image2, 5);
        image1.rectangle([match[1], match[2]], [match[3], match[4]], color, 1);
        nodecv.imwrite(outputPath, image1);
        resolve(match);
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
    filePaths.push({
      name: 'output',
      url: 'output.jpg'
    });
    if (filePaths.length) {
      this.body = {
        match: match,
        imageUrls: filePaths
      };
    }
  } catch (e) {
    console.log(e);
  }
};
