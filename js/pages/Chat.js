'use strict';

import WebSocket from 'ws';
const ws = new WebSocket('ws://localhost:3033');

export default class Chat {
	constructor(ctx) {
		this.ctx = ctx;
		this.connect();
	}

	connect() {
		console.log(this.ws);
		ws.onopen = () => {
			console.log('websocket opened');
			this.listener();
			this.testConnection();
		};
	}

	listener() {
		console.log('listening');
		ws.onmessage = (data, flags) => {
			console.log(data, flags);
		};
	}

	testConnection() {
		this.ctx.storage.get('currentUser', res => {
			console.log(res, this);
			this.send('testconnection', {
				userPHID: res.phid,
				apidetails: this.ctx.apidetails
			});
		});
	}

	send(action, data) {
		ws.send(JSON.stringify({
			action: action,
			data: data
		}));
	}
}
