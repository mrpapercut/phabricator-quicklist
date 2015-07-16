'use strict';

import React from 'react';

import {GetContext, StateStream} from '../mixins';

const {div, a} = React.DOM;

const TasksPage = React.createClass({

	mixins: [GetContext, StateStream],

	stateStream() {
		return this.ctx().stores.tasks
			.map(store => ({
				tasks: store.getTasks() || {}
			}));
	},

	render() {
		return (
			div({},
				null
			)
		);
	}
});

export default TasksPage;
