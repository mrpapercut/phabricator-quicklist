'use strict';

export default class ProjectsStore {

	constructor(projects) {
		this.projects = projects;
	}

	reinit() {
		return new ProjectsStore(this.projects);
	}

	setProjects(projects) {
		this.projects = projects;

		return this.reinit();
	}

	getProjects() {
		return this.projects;
	}
}
