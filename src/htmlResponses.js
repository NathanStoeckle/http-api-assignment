const fs = require('fs'); // Pulls in the file system module

// Loads the landing page for the client html and css
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Function used to get the index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// Function used to get the css page
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// Send out public exports
module.exports = {
  getIndex,
  getCSS,
};
