'use strict';

import React from 'react';

import {
	getTaskInfo,
	getTaskActivity
} from '../server';

import TaskDetailsPage from '../components/TaskDetailsPage';
const taskdetailsPage = React.createFactory(TaskDetailsPage);

export default class TaskDetails {
	constructor(ctx, params) {

		React.render(taskdetailsPage({
			ctx: ctx,
			params: params,
			getTaskInfo: getTaskInfo,
			getTaskActivity: getTaskActivity
		}), document.getElementById('container'));
	}
}
