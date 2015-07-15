'use strict';

import React from 'react';
import Bacon from 'baconjs';

import Context		from './Context';
import Container	from './components/Container';

const container = React.createFactory(Container);

import {
	AppStore,
	ProjectsStore,
	TasksStore,
	UsersStore
} from './stores';

import {
	listUsers,
	listProjects,
	getTasks,
	whoami
} from './server/server';

window.addEventListener('DOMContentLoaded', () => {
	const ctx = new Context();

	const usersData = listUsers();
	const curUser = whoami();
	ctx.stores.users = Bacon.update(
		new UsersStore(),
		[usersData], (store, data) => store.setUsers(data),
		[curUser], (store, data) => store.setCurrentUser(data)
	);

	ctx.stores.appstore = Bacon.update(
		new AppStore()
	);

	const projectsData = listProjects();
	ctx.stores.projects = Bacon.update(
		new ProjectsStore(),
		[projectsData], (store, data) => store.setProjects(data)
	);

	const tasksData = getTasks({
		// author: 'PHID-USER-w4nlajeutuuhnigt33dx',
		owner: 'PHID-USER-w4nlajeutuuhnigt33dx',
		project: 'PHID-PROJ-xlhiqmafp6l662vzxjj3',
		status: 'status-open'
	});
	ctx.stores.tasks = Bacon.update(
		new TasksStore(),
		[tasksData], (store, data) => store.setTasks(data)
	);

	React.render(container({
		ctx: ctx
	}), document.getElementById('container'));
});
