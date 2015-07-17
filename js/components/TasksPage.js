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

	parseTasks() {
		let tasks = [];

		for (let i in this.state.tasks) {
			const task = this.state.tasks[i];
			tasks.push(li({
				key: i,
				'data-id': task.id,
				'data-phid': i
			}, task.title));
		}

		return ul({}, tasks);
	},

	render() {
		return (
			div({},
				this.state.tasks ? this.parseTasks() : null
			)
		);
	}
});

export default TasksPage;
