var fallback = require('express-history-api-fallback');
var express = require('express');
var app = express();

var port = 3001;
var rootDirectory = __dirname;

app.use(express.static(rootDirectory))

app.use(fallback('index.html', {
  root: rootDirectory
}));

app.get(function (req, res, next) {
  if (req.accepts('html')) {
    res.sendFile(rootDirectory + '/index.html')
  } else {
    next()
  }
});

var server = app.listen(port, function () {
  var port = server.address().port;

  console.log('Server listening on port : ', port);
});
