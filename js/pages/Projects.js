'use strict';

import React from 'react';

import ProjectsPage from '../components/ProjectsPage';
const projectsPage = React.createFactory(ProjectsPage);

export default class Projects {
	constructor(ctx) {
		/*
		const projectsData = listProjects();
		ctx.stores.projects = Bacon.update(
			new ProjectsStore(),
			[projectsData], (store, data) => store.setProjects(data)
		);
		*/

		React.render(projectsPage({
			ctx: ctx
		}), document.getElementById('container'));
	}
}
