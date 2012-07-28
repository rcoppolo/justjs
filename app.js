var _ = require('underscore');
var express = require('express');

module.exports = {
  init: function(context, callback) {
    var app = context.app = express.createServer();
    callback();
  }
};
