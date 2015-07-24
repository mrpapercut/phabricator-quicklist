'use strict';

import React from 'react';

import {
	getTasks
} from '../server';

import TasksPage from '../components/TasksPage';
const tasksPage = React.createFactory(TasksPage);

export default class Tasks {
	constructor(ctx, params) {

		React.render(tasksPage({
			ctx: ctx,
			params: params,
			getTasks: getTasks
		}), document.getElementById('container'));
	}
}
