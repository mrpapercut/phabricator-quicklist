'use strict';

import React from 'react';

import {GetContext, StateStream} from '../mixins';

const {div, a} = React.DOM;

const ProjectsPage = React.createClass({

	mixins: [GetContext, StateStream],

	stateStream() {
		return this.ctx().stores.projects
			.map(store => ({
				projects: store.getProjects() || {}
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

export default ProjectsPage;
