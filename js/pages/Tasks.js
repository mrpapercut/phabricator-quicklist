'use strict';

import React from 'react';

import TasksPage from '../components/TasksPage';
const tasksPage = React.createFactory(TasksPage);

export default class Tasks {
	constructor(ctx) {
		/*
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
		*/

		React.render(tasksPage({
			ctx: ctx
		}), document.getElementById('container'));
	}
}
