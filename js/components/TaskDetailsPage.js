'use strict';

import React from 'react';

import {GetContext} from '../mixins';
import storage from '../lib/storage';

import parseDetails from './taskDetails';

const {div, h2, span} = React.DOM;

const TaskDetailsPage = React.createClass({

	mixins: [GetContext],

	getInitialState() {
		return {
			task: null,
			taskActivity: null
		};
	},

	componentWillMount() {
		this.props.getTaskInfo(this.props.params.task_id, (err, res) => {
			if (!err) {
				this.setState({
					task: res.data
				});
			}
		});

		this.props.getTaskActivity(this.props.params.task_id, (err, res) => {
			if (!err) {
				this.setState({
					taskActivity: res.data
				});
			}
		});
	},

	parseTask() {
		const {task} = this.state;

		return div({
			className: 'taskdetail'
		},
			h2({
				className: 'taskTitle status-' + task.status,
				'data-status': task.statusName
			}, task.title),
			div({
				className: 'taskDescription'
			}, task.description)
		);
	},

	parseActivity() {
		const {task, taskActivity} = this.state;

		return taskActivity[task.id].map(activity => parseDetails(activity, task.dateCreated));
	},

	render() {
		return div({},
			this.state.task ? this.parseTask() : null,
			this.state.taskActivity ? this.parseActivity() : null
		);
	}
});

export default TaskDetailsPage;
