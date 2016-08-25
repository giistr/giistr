var fallback = require('express-history-api-fallback');
var express = require('express');
var config = require('./server-config.json');
var bodyParser = require('body-parser');
var request = require('request');

// Express setup
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = 3001;
var rootDirectory = __dirname;

app.use(express.static(rootDirectory))

app.use(fallback('index.html', {
  root: rootDirectory
}));

app.get("/", function handler(req, res, next) {
  if (req.accepts('html')) {
    res.sendFile(rootDirectory + '/index.html');
  } else {
    next();
  }
});

// Proxy to get the API token from github avoiding annoying CORS issue
app.post('/api/github-login', function handler(req, res) {
  var code = req.body.code;

  if (!code) {
    res.send(500, { error: 'Provide a code' });
  }

  var form = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code: code
  };

  request
    .post({
      url: 'https://github.com/login/oauth/access_token',
      form: form
    }, function handler(err, httpResponse, body){
      if (!error && response.statusCode === 200) {
        var parsedRes = JSON.parse(body);
        res.send(200, {
          access_token: parsedRes.access_token
        });
      } else {
        res.send(500, { error: err });
      }
    });
});

// Start listening on the given port
var server = app.listen(port, function handler() {
  var port = server.address().port;
  console.log('Server listening on port: ', port);
});
