'use strict';

import React 		from 'react';
import WebSocket	from 'ws';

import {createReduxConnector}	from '../lib/createReduxConnector';
import {chatStore}				from '../stores/ChatStore';
import * as actions				from '../actions/ChatActions';

import ChatPage from '../components/ChatPage';
const chatPage = React.createFactory(ChatPage);

const ws = new WebSocket('ws://localhost:3033');

export default class Chat {
	constructor(ctx) {
		this.ctx = ctx;

		ctx.registerStores({
			chatStore: chatStore
		});

		ctx.ws = ws;

		React.render(
			React.createFactory(createReduxConnector({
				actions: actions,
				component: chatPage,
				sendMessage: (recipients, message) => this.sendMessage(recipients, message)
			}))({ctx}), document.getElementById('container')
		);

	}
}
