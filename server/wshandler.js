'use strict';

class WSHandler {
	constructor(wss) {
		this.wss = wss;
	}

	listen(ws) {
		this.ws = ws;

		ws.onmessage = msg => {
			this.handle(msg.data);
		};
	}

	handle(data) {
		data = JSON.parse(data);

		switch(data.action) {
			case 'testconnection':
				this.testConnection(data.data);
				break;

		}
	}

	broadcast(data) {
		this.wss.clients.forEach(client => {
			console.log(client);
			client.send(data);
		});
	}

	testConnection(data) {
		console.log(data);
		this.broadcast(JSON.stringify(data));
	}
};

export default WSHandler;