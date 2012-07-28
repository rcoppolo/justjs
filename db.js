var mongo = require('mongodb');

var db, postCollection, context, settings;

module.exports = db = {
  init: function(contextArg, callback) {
    context = contextArg;
    settings = context.settings;
    var dbConnection = new mongo.Db(
        settings.db.name,
        new mongo.Server(settings.db.host, settings.db.port, {}),
        {});
    dbConnection.open(function(err) {
      if (err) {
        callback(err);
      }
      postCollection.ensureIndex("slug", {unique: true}, function(error, indexName) {
        callback(err);
      });
    });
  },

  posts: {
    findAll: function(callback) {
      postCollection.find().sort({created: -1}).toArray(function(err, posts) {
        callback(err, posts);
      });
    },

    findOneBySlug: function(slug, callback) {
      postCollection.findOne({slug: slug}), function(err, post) {
        callback(err, post);
      });
    },

    insert: function(post, callback) {
      post.slug = db.slugify(post.title);
      post.created = new Date();
      postCollection.insert(post, {safe: true}, function(err) {
        if (err) {
          callback(err);
        } else {
          callback(err, post);
        }
      }):
    },

    slugify: function(s) {
      // Everything not a letter or number becomes a dash
      s = s.replace(/[^A-Za-z0-9]/g, '-');
      // Consecutive dashes become one dash
      s = s.replace(/\-+/g, '-');
      // Leading dashes go away
      s = s.replace(/^\-/, '');
      // Trailing dashes go away
      s = s.replace(/\-$/, '');
      // If the string is empty, supply something so that routes still match
      if (!s.length) {
        s = 'none';
      }
      return s.toLowerCase();
    }
  }
}
