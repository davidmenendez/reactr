const express = require('express');
const session = require('express-session');
const path = require('path');
const TwitterApi = require('node-twitter-api');
const bodyParser = require('body-parser');
const config = require('./config.js');
const fakeResults = require('./fake_results.json');
const compression = require('compression');
const logger = require('morgan');

const useFakeResults = process.env.FAKERESULTS || false;
const app = express();
const twitter = new TwitterApi({
  consumerKey: config.consumer_key,
  consumerSecret: config.consumer_secret,
  callback: config.callback,
});

let requestSecret;
let accessToken;
let accessSecret;

app.use(compression());
app.use(logger('dev'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'mrbig500', resave: false, saveUninitialized: true }));

app.get('/', (req, res) => {
  res.render('index', {
    user: req.session.user,
  });
});

app.get('/token', (req, res) => {
  twitter.getRequestToken((err, token, secret) => {
    if (err) {
      res.status(500).send(err);
    } else {
      requestSecret = secret;
      res.redirect(`https://api.twitter.com/oauth/authenticate?oauth_token=${token}`);
    }
  });
});

app.get('/access-token', (req, res) => {
  const requestToken = req.query.oauth_token;
  const verifier = req.query.oauth_verifier;
  twitter.getAccessToken(requestToken, requestSecret, verifier, (err, token, secret) => {
    if (err) {
      res.status(500).send(err);
    } else {
      twitter.verifyCredentials(token, secret, (err, user) => {
        if (err) {
          res.status(500).send(err);
        } else {
          accessToken = token;
        }
        accessSecret = secret;
        req.session.user = user;
        res.redirect('/');
      });
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/api/user', (req, res) => {
  if (req.session.user) {
    res.status(200).send(req.session.user);
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.get('/api/followers/:screen_name/:cursor', (req, res) => {
  const params = {
    screen_name: req.params.screen_name,
    count: 200,
    skip_status: true,
    cursor: req.params.cursor,
  };
  if (useFakeResults) {
    res.json(fakeResults);
  } else {
    twitter.friends('list', params, config.access_token_key, config.access_token_secret, (error, body) => {
      if (!error) {
        res.json(body);
      } else {
        res.status(500).send(error);
      }
    });
  }
});

app.post('/api/friendships/destroy/:user_id', (req, res) => {
  const params = {
    user_id: req.params.user_id,
  };
  twitter.friendships('destroy', params, accessToken, accessSecret, (error, body) => {
    if (!error) {
      res.status(200).send(body);
    } else {
      res.status(500).send(error);
    }
  });
});

app.post('/api/friendships/create/:user_id', (req, res) => {
  const params = {
    user_id: req.params.user_id,
  };
  twitter.friendships('create', params, accessToken, accessSecret, (error, body) => {
    if (!error) {
      res.status(200).send(body);
    } else {
      res.status(500).send(error);
    }
  });
});

app.get('/api/geo/search', (req, res) => {
  const params = {
    q: '',
    geocode: '30.2672,-97.7431,15mi',
    result_type: 'recent',
    count: 100,
  };
  twitter.search(params, config.access_token_key, config.access_token_secret, (error, body) => {
    if (!error) {
      res.json(body);
    } else {
      res.status(500).send(error);
    }
  });
});

app.listen('8000', () => {
  console.log('running on 8000');
});
