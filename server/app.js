'use strict';

var http = require('http');
var Handler = require('./handler');

var handler = new Handler();

var port = 3000;

var server = http.createServer(handler.listen);

server.listen(port, function() {
	console.log('Listening on http://localhost:%s', port);
});
