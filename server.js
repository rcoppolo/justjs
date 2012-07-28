var context = {};
context.settings = require('./settings');

var async = require('async');
async.series([setupDb, setupApp, listen], ready);

function setupDb(callback) {
  context.db = require('./db');
  context.db.init(context, callback);
}

function setupApp(callback) {
  context.app = require('./app');
  context.app.init(context, callback);
}

function listen(callback) {
  context.app.listen(context.settings.http.port);
  callback(null);
}

function ready(err) {
  if (err) {
    throw err;
  }
  console.log("Ready and listing at http://localhost:" + context.settings.http.port);
}

var express = require('express');

var posts = {
  'welcome': {
    title: 'How the hell are you?',
    body: 'Here is a blog post I guess.'
  }
};

var app = require('express').createServer();

app.get('/', function(req,res) {
  var s = "<title>My blog.</title>\n";
  s += "<h1>My blog.</h1>\n";
  s += "<ul>\n";
  for (var slug in posts) {
    var post = posts[slug];
    s += '<li><a href="/posts/' + slug + '">' + post.title + '</a></li>' + "\n";
  }
  s += "</ul>\n";
  res.send(s);
});

app.get('/posts/:slug', function(req,res) {
  var post = posts[req.params.slug];
  if (typeof(post) === 'undefined') {
    notFound(res);
    return;
  }
  var s = "<title>" + post.title + "</title>\n";
  s += "<h1>My blog.</h1>\n";
  s += "<h2>" + post.title + "</h2>\n";
  s += post.body;
  res.send(s);
});

app.get('*', function(req,res) {
  notFound(res);
});

function notFound(res) {
  res.send('<h1>Page not found.</h1>', 404);
}

app.listen(3001);
console.log("Listening for connections.");
