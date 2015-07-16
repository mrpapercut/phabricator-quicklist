'use strict';

import React from 'react';

import UsersPage from '../components/UsersPage';
const usersPage = React.createFactory(UsersPage);

export default class Users {
	constructor(ctx) {
		/*
		const usersData = listUsers();
		const curUser = whoami();
		ctx.stores.users = Bacon.update(
			new UsersStore(),
			[usersData], (store, data) => store.setUsers(data),
			[curUser], (store, data) => store.setCurrentUser(data)
		);
		*/

		React.render(usersPage({
			ctx: ctx
		}), document.getElementById('container'));
	}
}
