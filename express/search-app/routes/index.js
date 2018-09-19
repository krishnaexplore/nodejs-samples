var express = require('express');
var router = express.Router();
var mw = require('./my-middleware.js')
//

router.use(function timeLog (req, res, next) {
  req.requestTime = Date.now();
  next()
})
/* GET home page. */
router.use(mw({ option1: '1', option2: '2' }))
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
});

router.get('/flights/:from-:to', function(req, res, next) {
  res.send(req.params);
});
router.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})
router.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

router.get('/example/c', [cb0, cb1, cb2])
router.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
router.use(myLogger);

module.exports = router;
