'use strict';

require('babel/register');

var http = require('http');
var WebSocketServer = require('ws').Server;

var Handler = require('./handler');
var WSHandler = require('./wshandler');

var handler = new Handler();
var wss = new WebSocketServer({
	port: 3033
});
var wshandler = new WSHandler(wss);

var port = 3000;

var server = http.createServer(handler.listen);

server.listen(port, function() {
	console.log('Listening on http://localhost:%s', port);
});

wss.on('connection', function(ws) {
	wshandler.listen(ws)
});
