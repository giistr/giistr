var fallback = require('express-history-api-fallback');
var express = require('express');
var app = express();

var port = 3002;

app.use(express.static(__dirname))

app.use(fallback('index.html', {
  root: __dirname
}));

app.get(function (req, res, next) {
  if (req.accepts('html')) {
    res.sendFile(__dirname + '/index.html')
  } else {
    next()
  }
});

var server = app.listen(port, function () {
  var port = server.address().port;

  console.log('Server listening on port : ', port);
});
