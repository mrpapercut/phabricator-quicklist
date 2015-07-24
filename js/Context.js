'use strict';

import assign from 'object-assign';
import {createRedux, createDispatcher, composeStores} from 'redux';
import thunkMiddleware from 'redux/lib/middleware/thunk';

import storage	from './lib/storage';

class Context {
	constructor() {
		this._stores = {};
		this.storage = storage;

		this._redux = createRedux(this._stores);
	}

	registerStores(stores) {
		assign(this._stores, stores);

		const dispatcher = createDispatcher(
			composeStores(this._stores),
			getState => [thunkMiddleware(getState)]
		);

		this._redux.replaceDispatcher(dispatcher);
	}

	getRedux() {
		return this._redux;
	}

	setCurrentUser(user) {
		this.currentUser = user;
	}

	getCurrentUser() {
		return this.currentUser || {};
	}
}

export default Context;
