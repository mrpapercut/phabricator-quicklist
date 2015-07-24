'use strict';

import Dispatcher from './dispatcher/Dispatcher';

class Context {

	constructor() {
		this.dispatcher = new Dispatcher();
		this.stores = {};
		this.actions = {};
	}

	getDispatcher() {
		return this.dispatcher;
	}

	setCurrentUser(user) {
		this.currentUser = user;
	}

	getCurrentUser() {
		return this.currentUser || {};
	}
}

export default Context;
