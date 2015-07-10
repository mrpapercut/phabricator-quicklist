'use strict';

export default class TasksStore {

	constructor(tasks) {
		this.tasks = tasks;
	}

	reinit() {
		return new TasksStore(this.tasks);
	}

	setTasks(tasks) {
		this.tasks = tasks;

		return this.reinit();
	}

	getTasks() {
		return this.tasks;
	}
}
