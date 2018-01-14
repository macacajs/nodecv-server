# nodecv-server

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/nodecv-server.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nodecv-server
[travis-image]: https://img.shields.io/travis/macacajs/nodecv-server.svg?style=flat-square
[travis-url]: https://travis-ci.org/macacajs/nodecv-server
[coveralls-image]: https://img.shields.io/coveralls/macacajs/nodecv-server.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/macacajs/nodecv-server?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/nodecv-server.svg?style=flat-square
[download-url]: https://npmjs.org/package/nodecv-server

> [nodecv](//github.com/macacajs/nodecv) server side

## Usage

```bash
$ git clone git@github.com:macacajs/nodecv-server.git --depth=1
$ cd nodecv-server
$ npm i
$ make server
```

Please visit demo: `http://localhost:9900/`

![](http://wx3.sinaimg.cn/large/6d308bd9gy1fek6oa9i3vj21kw0zrn4y.jpg)

## API


```
POST /opencv/dissimilarity
```

```
POST /opencv/matchtemplate
```

```
POST /opencv/cascadedetect
```

Example:

```javascript
request.post({
  url: `${remoteHost}/opencv/dissimilarity`,
  formData: formData
}, function(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Server responded with:', body);
  try {
    const data = JSON.parse(body);
    console.log(`Dissimilarity is: ${data.dissimilarity}`);
  } catch (e) {
  }
});
```

More sample: [macaca-sample](//github.com/macaca-sample)

## License

The MIT License (MIT)
