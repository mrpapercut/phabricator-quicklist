'use strict';

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

	setCurrentUser(user) {
		this.curUser = user;

		return this.reinit();
	}

	getCurrentUser() {
		return this.curUser;
	}
}
