var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/tweets', function(req, res, next) {
  res.json([
    {
      'username': 'tod',
      'tweet': 'sup boi'
    },
    {
      'username': 'jane',
      'tweet': 'where they at'
    }
  ]);
});

app.listen('8000', function() {
  console.log('running on 8000');
});