'use strict';

var WebSocketServer = require('ws').Server;

class WSHandler {
	constructor(wss) {
		this.wss = new WebSocketServer({
			port: 3033
		});

		this.wss.on('connection', ws => this.listen(ws));

		this.clients = [];
	}

	listen(ws) {
		ws.onclose = msg => {
			this.clients.splice(this.clients.indexOf(ws), 1);
		};

		ws.onerror = msg => {
			console.log('error: ', msg);
		};

		ws.onmessage = msg => {
			this.handle(ws, msg.data);
		};
	}

	handle(connection, data) {
		data = JSON.parse(data);

		switch(data.action) {
			case 'registerconnection':
				this.registerConnection(data.userPHID, connection);
				break;
			case 'sendmessage':
				this.handleMessage(data.data, data.userPHID);
				break;
		}
	}

	broadcast(data, recipientList) {
		if (recipientList) {
			recipientList.forEach(recipient => {
				this.clients.forEach(client => {
					if (client.userPHID === recipient) client.send(data);
				});
			});
		} else {
			this.wss.clients.forEach(client => {
				client.send(data);
			});
		}
	}

	registerConnection(user, connection) {
		connection.userPHID = user;

		this.clients.push(connection);

		this.broadcast(JSON.stringify({
			status: 'ok',
			msg: 'registration success'
		}), [user]);
	}

	handleMessage(data, from) {
		const {to, message} = data;

		var end = Date.now() + 2000;
		while (Date.now() < end) ;

		this.broadcast(JSON.stringify({
			status: 'ok',
			type: 'received',
			msg: message,
			from: from
		}), to);
	}
};

export default WSHandler;