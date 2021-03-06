'use strict';

import React from 'react';

import {GetContext} from '../mixins';

const {div, ul, li} = React.DOM;

const TasksPage = React.createClass({

	mixins: [GetContext],

	getInitialState() {
		return {
			tasks: null
		};
	},

	componentWillMount() {
		this.props.getTasks({
			owner: 'PHID-USER-w4nlajeutuuhnigt33dx',
			project: 'PHID-PROJ-xlhiqmafp6l662vzxjj3'
		}, (err, res) => {
			this.setState({
				tasks: res.data
			});
		});
	},

	loadTask(task_id) {
		const ctx = this.ctx();
		ctx.loadPage('taskdetails', ctx, {task_id: task_id});
	},

	parseTasks() {
		let tasks = [];

		for (let i in this.state.tasks) {
			const task = this.state.tasks[i];
			tasks.push(li({
				key: i,
				'data-id': task.id,
				'data-phid': i,
				className: 'is-button',
				onClick: () => this.loadTask(task.id)
			}, task.title));
		}

		return ul({}, tasks);
	},

	parseTask() {
		this.props.getTaskInfo(this.props.params.task_id, (err, res) => {
			console.log(res.data);
		});
	},

	render() {
		return (
			div({},
				this.props.params ? this.parseTask() :
				this.state.tasks ? this.parseTasks() : null
			)
		);
	}
});

export default TasksPage;
