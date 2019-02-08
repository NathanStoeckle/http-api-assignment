// Used for JSON and XML responses
//  Tried to use a one seperately, but it caused problems for the internal error part
const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// Called on a successful request - 200
const success = (request, response, acceptedTypes) => {

  // Send the message
  const responseJSON = {
    message: 'This is a successful response',
    id: 'Success',
  };
  
  // Checks if it's XML
  if (acceptedTypes[0] === 'text/xml') {
    // Create an XML string
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  // default to JSON
  const responseString = JSON.stringify(responseJSON);
  
  // send our json with a success status code
  return respond(request, response, 200, responseString, 'application/json');
};


// Called when a page cannnot be found - 404
const notFound = (request, response, acceptedTypes) => {

  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }
  
  const responseString = JSON.stringify(responseJSON);

  // return json
  return respond(request, response, 404, responseString, 'application/json');
};

// Called when there is a bad request - 400
const badRequest = (request, response, acceptedTypes, params) => {

  // message to send
  const responseJSON = {
    message: 'This request has the required parameters.',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    
    // Set the correct error message
    responseJSON.message = 'Missing valid query parameter set to true.';

    // GIve the error a consistent id
    responseJSON.id = 'badRequest';

    // Checks if it's XML
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 400, responseXML, 'text/xml');
    }

    // return with default JSON
    const responseString = JSON.stringify(responseJSON);

    return respond(request, response, 400, responseString, 'application/json');
  }

  // If the params are true...
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  // default JSON
  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 200, responseString, 'application/json');
};

// Called when there is an unauthorized request - 401
const unauthorized = (request, response, acceptedTypes, params) => {

  // message to send
  const responseJSON = {
    message: 'You have successfully viewed the content.',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // set our error message
    responseJSON.message = 'Missing loggedIn query parameter set to yes.';

    // give the error a consistent id
    responseJSON.id = 'unauthorized';

    // if its requested xml
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 401, responseXML, 'text/xml');
    }

    // return with default JSON
    const responseString = JSON.stringify(responseJSON);

    return respond(request, response, 401, responseString, 'application/json');
  }

  // If the params are true...
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  // default JSON
  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 200, responseString, 'application/json');
};

// Called when there is a forbidden request - 403
const forbidden = (request, response, acceptedTypes) => {

  // message to send
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'Forbidden',
  };

  // if its xml
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 403, responseXML, 'text/xml');
  }

  // default to JSON
  const responseString = JSON.stringify(responseJSON);

  // send json
  return respond(request, response, 403, responseString, 'application/json');
};


// Called when there is an internal server error - 500
//  This caused me more trouble than any other function here...
const internal = (request, response, acceptedTypes) => {

  // message to send
  const responseJSON = {
    message: 'Internal server error, something went wrong.',
    id: 'internalError',
  };

  // if its xml
  if (acceptedTypes[0] === 'text/xml') {

    // create a valid XML string
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }

  // default to JSON
  const responseString = JSON.stringify(responseJSON);

  // send json
  return respond(request, response, 500, responseString, 'application/json');
};

// Called when client attempts to call something that wasn't implemented - 501
const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check back later for updated content.',
    id: 'notImplemented',
  };

  // XML format
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }
  
  // default to JSON
  const responseString = JSON.stringify(responseJSON);
  
  return respond(request, response, 501, responseString, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};