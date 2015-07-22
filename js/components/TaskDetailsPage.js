'use strict';

import React from 'react';

import {GetContext} from '../mixins';
import storage from '../lib/storage';

const {div, h2} = React.DOM;

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
		const task = this.state.task;

		console.log(task);

		return div({
			className: 'taskdetail'
		},
			h2({},
				task.title
			)
		);
	},

	parseActivity() {
		const activity = this.state.taskActivity;

		console.log(activity);
	},

	render() {
		return div({},
			this.state.task ? this.parseTask() : null,
			this.state.taskActivity ? this.parseActivity() : null
		);
	}
});

export default TaskDetailsPage;
