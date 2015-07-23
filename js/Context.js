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
}

export default Context;
