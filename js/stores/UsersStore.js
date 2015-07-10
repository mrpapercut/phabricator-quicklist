'use strict';

export default class UsersStore {

	constructor(users) {
		this.users = users;
	}

	reinit() {
		return new UsersStore(this.users);
	}

	setUsers(users) {
		this.users = users;

		return this.reinit();
	}

	getUsers() {
		return this.users;
	}
}
