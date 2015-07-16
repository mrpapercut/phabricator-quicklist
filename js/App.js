'use strict';

import Context	from './Context';
import Pages	from './pages';
import storage	from './lib/storage';

let loadedPage = null;

const loadPage = function(page, ctx) {
	if (!page) {
		storage.get('lastpage', (lastpage) => {
			if (lastpage && Pages[lastpage]) {
				loadPage(lastpage);
			} else {
				loadPage('tasks');
			}
		});
	} else {
		if (Pages[page]) {
			storage.set('lastpage', page, (res) => {
				loadedPage = new Pages[page](ctx);
			});
		} else {
			loadPage('tasks');
		}
	}
};

window.addEventListener('DOMContentLoaded', () => {
	const ctx = new Context();

	ctx.loadPage = loadPage;

	storage.get('apidetails', (details) => {
		if (details) {
			ctx.apidetails = details;
			loadPage(null, ctx);
		} else {
			loadPage('login', ctx);
		}
	});
});
