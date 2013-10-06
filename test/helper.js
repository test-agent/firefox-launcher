global.assert = require('assert');
var TEST_PORT = 8787;

global.testServer = function() {
  // reference to the sever must be at this function scope so
  // suiteTeardown can actually close it.
  var server;

  suiteSetup(function() {
    var static = require('node-static');
    // root of the project
    var file = new static.Server(__dirname + '/fixtures/');

    server = require('http').createServer(function(request, response) {
      request.addListener('end', function() {
        // Serve files!
        file.serve(request, response);
      }).resume();
    }).listen(8787);
  });

  suiteTeardown(function() {
    server.close();
  });

  return 'http://localhost:' + TEST_PORT + '/index.html';
};
