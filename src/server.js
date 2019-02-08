const http = require('http'); // http module
const url = require('url'); // url module

// querystring module for parsing querystrings from url
const query = require('querystring');

const jsonHandler = require('./jsonResponses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// key:value object to look up URL routes to specific functions
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  '/notFound': jsonHandler.notFound,
  notFound: jsonHandler.notFound,
};

// Function to handle requests
const onRequest = (request, response) => {
  // Gets parameters and parses URL
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  // Sends requests based on URL
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes, params);
  }
};

// Start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);