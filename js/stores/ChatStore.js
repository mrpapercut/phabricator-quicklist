'use strict';

import {OrderedMap} from 'immutable';

import {
	ADD_MESSAGE,
	GET_MESSAGES
} from '../constants/actionTypes';

export class ChatStore {
	constructor(messages = new OrderedMap()) {
		this.messages = messages;
	}

	addMessage(message) {
		return new this.constructor(
			this.messages.set(message.id, message)
		);
	}

	getMessages() {
		return this.messages;
	}
}

export function chatStore(store = new ChatStore(), action = {}) {
	const {type, data} = action;
	switch(type) {
		case ADD_MESSAGE:
			return store.addMessage(data);
		case GET_MESSAGES:
			return store.getMessages();
	}

	return store;
}
