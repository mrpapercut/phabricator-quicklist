'use strict';

import React from 'react';

import {GetContext, StateStream} from '../mixins';

const {div, a} = React.DOM;

const Tasks = React.createClass({

	mixins: [GetContext, StateStream],

	stateStream() {
		return this.ctx().stores.tasks
			.map(store => ({
				tasks: store.getTasks() || {}
			}));
	},

	render() {
		console.log(this.state.tasks);
		return (
			div({},
				null
			)
		);
	}
});

export default Tasks;