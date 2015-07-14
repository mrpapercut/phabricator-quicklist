'use strict';

export default class AppStore {

	constructor(currentPage) {
		this.currentPage = currentPage;
	}

	reinit() {
		return new AppStore(this.currentPage);
	}

	setCurrentPage(page) {
		this.currentPage = page;
	}

	getCurrentPage() {
		return this.currentPage;
	}
}
