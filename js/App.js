'use strict';

import React from 'react';
import Bacon from 'baconjs';

import Context		from './Context';
import Container	from './components/Container';

import UsersStore	from './stores/UsersStore';

const container = React.createFactory(Container);

import {loadUsers} from './server/server';

window.addEventListener('DOMContentLoaded', () => {
	const ctx = new Context();

	const usersData = loadUsers();

	ctx.stores.users = Bacon.update(
		new UsersStore(),
		[usersData], (store, data) => store.setUsers(data)
	);

	React.render(container({
		ctx: ctx
	}), document.getElementById('container'));
});
