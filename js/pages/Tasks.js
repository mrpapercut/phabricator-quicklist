'use strict';

import React from 'react';

import {
	getTasks,
	getTaskInfo
} from '../server/server';

import TasksPage from '../components/TasksPage';
const tasksPage = React.createFactory(TasksPage);

export default class Tasks {
	constructor(ctx) {

		React.render(tasksPage({
			ctx: ctx,
			getTasks: getTasks,
			getTaskInfo: getTaskInfo
		}), document.getElementById('container'));
	}
}
