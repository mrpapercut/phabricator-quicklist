'use strict';

import contains from 'ramda/src/contains';

import storage from '../lib/storage';

export default class UsersStore {

	constructor(users, curUser) {
		this.users = users || [];
		this.curUser = curUser || {};
	}

	reinit() {
		return new UsersStore(this.users, this.curUser);
	}

	setUsers(users) {
		this.users = users;

		return this.reinit();
	}

	getUsers() {
		return this.users;
	}

	getActiveUsers() {
		return this.users.filter(user => contains('activated', user.roles));
	}

	setCurrentUser(user) {
		storage.set('currentUser', user, (err, res) => {
			console.log(err, res);
		});

		this.curUser = user;
		return this.reinit();
	}

	getCurrentUser() {
		return this.curUser;
	}
}
