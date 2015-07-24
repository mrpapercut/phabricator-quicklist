'use strict';

import {OrderedMap} from 'immutable';

import {
	SET_CURRENTUSER,
	GET_CURRENTUSER,
	SET_AVATAR,
	GET_AVATAR
} from '../constants/actionTypes';

export class AppStore {

	constructor(userdetails, avatar) {
		this.userdetails = userdetails || null;
		this.avatar = avatar || null;
	}

	reinit() {
		return new AppStore(this.userdetails, this.avatar);
	}

	setCurrentUser(details) {
		this.userdetails = details;
		return this.reinit();
	}

	getCurrentUser() {
		return this.userdetails;
	}

	setAvatar(str) {
		this.avatar = str;
		return this.reinit();
	}

	getAvatar() {
		return this.avatar;
	}
}

export function appStore(store = new AppStore(), action = {}) {
	const {type, data} = action;
	switch (type) {
		case SET_CURRENTUSER:
			return store.setCurrentUser(data);
		case GET_CURRENTUSER:
			return store.getCurrentUser();
		case SET_AVATAR:
			return store.setAvatar(data);
		case GET_AVATAR:
			return store.getAvatar();
	}

	return store;
}
