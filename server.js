var http = require('http');

var posts = {
  '/welcome': {
    title: 'How the hell are you?',
    body: 'Here is a blog post I guess.'
  }
};

var server = http.createServer(function(req, res) {
  if (req.url === '/') {
    index();
  } else if (posts[req.url]) {
    post(req.url);
  } else {
    notFound();
  }

  function index() {
    var s = "<title>My Blog</title>\n";
    s += "<h1>My Blog</h1>\n";
    s += "<ul>\n";
    for (var slug in posts) {
      var post = posts[slug];
      s += '<li><a href="' + slug + '">' + post.title + '</a></li>' + "\n";
    }
    s += "</ul>\n";
    sendBody(s);
  }

  function post(url) {
    var post = posts[url];
    var s = "<title>" + post.title + "</title>\n";
    s += "<h1>My Blog</h1>\n";
    s += "<h2>" + post.title + "</h2>\n";
    s += post.body;
    sendBody(s);
  }

  function notFound() {
    res.writeHead(404,{'Content-Type': 'text/html'});
    res.end('<h1>Post not found.</h1>');
  }

  function sendBody(s) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(s);
  }

});

server.listen(3001);
console.log("Listening for connections.");
