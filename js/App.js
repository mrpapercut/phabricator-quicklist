'use strict';

import React from 'react';
import Bacon from 'baconjs';

import Context		from './Context';
import Container	from './components/Container';

import UsersStore	from './stores/UsersStore';
import TasksStore	from './stores/TasksStore';

const container = React.createFactory(Container);

import {
	loadUsers,
	getAssignedTasks
} from './server/server';

window.addEventListener('DOMContentLoaded', () => {
	const ctx = new Context();

	const usersData = loadUsers();

	ctx.stores.users = Bacon.update(
		new UsersStore(),
		[usersData], (store, data) => store.setUsers(data)
	);

	const tasksData = getAssignedTasks({
		owner: 'PHID-USER-w4nlajeutuuhnigt33dx',
		project: 'PHID-PROJ-xlhiqmafp6l662vzxjj3'
	});

	ctx.stores.tasks = Bacon.update(
		new TasksStore(),
		[tasksData], (store, data) => store.setTasks(data)
	);

	React.render(container({
		ctx: ctx
	}), document.getElementById('container'));
});
