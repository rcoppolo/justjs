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
