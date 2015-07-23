'use strict';

export default class AppStore {

	constructor(currentPage, details) {
		this.currentPage = currentPage || null;
		this.details = details || null;
	}

	reinit() {
		return new AppStore(this.currentPage, this.details);
	}

	setCurrentPage(page) {
		this.currentPage = page;
	}

	getCurrentPage() {
		return this.currentPage;
	}

	setWhoami(details) {
		this.details = details;
		return this.reinit();
	}

	getWhoami() {
		return this.details;
	}
}
