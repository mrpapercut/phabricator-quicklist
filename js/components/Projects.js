'use strict';

import React from 'react';

import {GetContext, StateStream} from '../mixins';

const {div, a} = React.DOM;

const Projects = React.createClass({

	mixins: [GetContext, StateStream],

	stateStream() {
		return this.ctx().stores.projects
			.map(store => ({
				projects: store.getProjects() || {}
			}));
	},

	render() {
		console.log(this.state.projects);
		return (
			div({},
				null
			)
		);
	}
});

export default Projects;
