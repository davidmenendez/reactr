var express = require('express');
var session = require('express-session');
var path = require('path');
var twitterApi = require('node-twitter-api');
var bodyParser = require('body-parser');
var config = require('./config.js');
var fakeResults = require('./fake_results.json');
var compression = require('compression');
var logger = require('morgan');
var useFakeResults = process.env.FAKERESULTS ? true : false;
var app = express();

app.use(compression());
app.use(logger('dev'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'mrbig500', resave: false, saveUninitialized: true}));

var twitter = new twitterApi({
  consumerKey: config.consumer_key,
  consumerSecret: config.consumer_secret,
  callback: config.callback
});

var _requestSecret;
var _accessToken;
var _accessSecret;

app.get('/', function(req, res) {
  res.render('index', {
    user: req.session.user
  });
});

app.get("/token", function(req, res) {
  twitter.getRequestToken(function(err, requestToken, requestSecret) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      _requestSecret = requestSecret;
      res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
    }
  });
});

app.get("/access-token", function(req, res) {
  var requestToken = req.query.oauth_token;
  var verifier = req.query.oauth_verifier;
  twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
    if (err)
      res.status(500).send(err);
    else
      twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
        if (err)
          res.status(500).send(err);
        else
          _accessToken = accessToken;
        _accessSecret = accessSecret;
        req.session.user = user;
        res.redirect('/');
      });
  });
});

app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

app.get('/api/user', function(req, res) {
  if (req.session.user)
    res.status(200).send(req.session.user)
  else
    res.status(401).send('Unauthorized');
});

app.get('/api/followers/:screen_name/:cursor', function(req, res, next) {
  var params = {
    screen_name: req.params.screen_name,
    count: 200,
    skip_status: true,
    cursor: req.params.cursor
  };
  if (useFakeResults) {
    res.json(fakeResults);
  }
  else {
    twitter.friends('list', params, config.access_token_key, config.access_token_secret, function(error, body, response){
      if (!error) {
        res.json(body);
      }
      else{
        console.log('error', error);
        res.status(500).send(error);
      }
    });
  }
});


app.post('/api/friendships/destroy/:user_id', function(req, res, next) {
  var params = {
    user_id: req.params.user_id
  };
  twitter.friendships('destroy', params, _accessToken, _accessSecret, function(error, body, response){
    if (!error) {
      res.status(200).send(body);
    }
    else{
      console.log('error', error);
      res.status(500).send(error);
    }
  });
});

app.post('/api/friendships/create/:user_id', function(req, res, next) {
  var params = {
    user_id: req.params.user_id
  };
  twitter.friendships('create', params, _accessToken, _accessSecret, function(error, body, response){
    if (!error) {
      res.status(200).send(body);
    }
    else{
      console.log('error', error);
      res.status(500).send(error);
    }
  });
});

app.get('/api/geo/search', function(req, res, next) {
  //todo figureout how to get the geocode
  params = {
    q: '',
    geocode: '30.2672,-97.7431,15mi',
    result_type: 'recent',
    count: 100
  }
  twitter.search(params, config.access_token_key, config.access_token_secret, function(error, body, response) {
    if (!error) {
      res.json(body);
    }
    else{
      console.log('error', error);
      res.status(500).send(error);
    }
  });
});

app.listen('8000', function() {
  console.log('running on 8000');
});