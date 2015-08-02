'use strict';

require('babel/register');

var http = require('http');

var Handler = require('./handler');
var WSHandler = require('./wshandler');

var handler = new Handler();
var wshandler = new WSHandler();

var port = 3000;

var server = http.createServer(handler.listen);

server.listen(port, function() {
	console.log('Listening on http://localhost:%s', port);
});
