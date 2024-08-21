// Create web server
// 1. Load the http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var port = 8080;
var comments = [];

// 2. Use the http module to create a new web server
http.createServer(function(request, response) {
  var urlPath = url.parse(request.url).pathname;
  var method = request.method;

  if (urlPath === '/' && method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.end(fs.readFileSync('index.html'));
  } else if (urlPath === '/comments' && method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'application/json'
    });
    response.end(JSON.stringify(comments));
  } else if (urlPath === '/comments' && method === 'POST') {
    var body = '';
    request.on('data', function(chunk) {
      body += chunk;
    });
    request.on('end', function() {
      var comment = JSON.parse(body);
      comments.push(comment);
      response.writeHead(201, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify(comments));
    });
  } else {
    response.writeHead(404, {
      'Content-Type': 'text/html'
    });
    response.end('404 Not Found');
  }
}).listen(port);

console.log('Server listening on http://localhost:' + port);