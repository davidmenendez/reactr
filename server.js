var express = require('express');
var app = express();
var path = require('path');
var twitter = require('twitter');
var request = require('request');

app.use(express.static(path.join(__dirname, 'public')));

var client = new twitter({
  consumer_key: 'CZ5fkqnMYknHhlj7FAsPLlucA',
  consumer_secret: 'FSw9gKC6sP21uG7PQwlxh6ljkkzac1qC6zYswfoTgqvcSNyx5W',
  access_token_key: '790108770-qZCRsr3CLQ3ZU65jr0s6I9EEeA1m7zNP2VymJFKo',
  access_token_secret: 'bM1KWJJu06S5FHd12BtLjIqiPrZzy9yevdTjI2VjS7tBK'
});

app.get('/api/tweets', function(req, res, next) {
  var params = {
    q: 'mrbig500',
    count: 5
  };
  client.get('search/tweets', params, function(error, tweets, response){
    if (!error) {
      res.json(tweets);
    }
    else{
      console.log('error', error);
    }
  });
});

app.listen('8000', function() {
  console.log('running on 8000');
});