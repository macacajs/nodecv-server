'use strict';

const path = require('path');
const nodecv = require('nodecv');

const upload_dir = path.join(__dirname, '..', '..', 'upload');

const handle = function(filePaths) {
  return new Promise(resolve => {
    const color = [0, 255, 0];
    const image1path = path.join(upload_dir, filePaths[0].url);
    const outputPath = path.join(upload_dir, 'output.jpg');
    const haarcascade = path.join(__dirname, '..', '..', 'static', 'haarcascade_frontalface_alt2.xml');
    nodecv.imread(image1path, (err, im) => {
      var face_cascade = new nodecv.CascadeClassifier(haarcascade);
      var opts = {};
      face_cascade.detectMultiScale(im, (err, faces) => {
        for (var i = 0; i < faces.length; i++) {
          var face = faces[i];
          im.rectangle([face.x, face.y], [face.width, face.height], color, 1);
        }
        nodecv.imwrite(outputPath, im);
        resolve(faces);
      }, opts.scale, opts.neighbors, opts.min && opts.min[0], opts.min && opts.min[1]);
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
    const faces = yield handle(filePaths);
    filePaths.push({
      name: 'output',
      url: 'output.jpg'
    });
    if (filePaths.length) {
      this.body = {
        faces: faces,
        imageUrls: filePaths
      };
    }
  } catch (e) {
    console.log(e);
  }
};
