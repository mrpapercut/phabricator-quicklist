'use strict';

import React from 'react';
import Bacon from 'baconjs';

import Context			from './Context';
import Container		from './components/Container';

import UsersStore		from './stores/UsersStore';
import TasksStore		from './stores/TasksStore';
import ProjectsStore	from './stores/ProjectsStore';

const container = React.createFactory(Container);

import {
	listUsers,
	listProjects,
	getAssignedTasks
} from './server/server';

window.addEventListener('DOMContentLoaded', () => {
	const ctx = new Context();

	const usersData = listUsers();

	ctx.stores.users = Bacon.update(
		new UsersStore(),
		[usersData], (store, data) => store.setUsers(data)
	);

	const projectsData = listProjects();

	ctx.stores.projects = Bacon.update(
		new ProjectsStore(),
		[projectsData], (store, data) => store.setProjects(data)
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
