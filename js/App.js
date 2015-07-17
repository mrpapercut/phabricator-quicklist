'use strict';

import Context	from './Context';
import Pages	from './pages';
import storage	from './lib/storage';

let loadedPage = null;

const loadPage = function(page, ctx) {
	if (!page && ctx.apidetails) {
		storage.get('lastpage', (lastpage) => {
			if (lastpage && Pages[lastpage] && lastpage !== 'login') {
				loadPage(lastpage);
			} else {
				loadPage('tasks');
			}
		});
	} else if (page && Pages[page]) {
		storage.set('lastpage', page, (res) => {
			document.body.setAttribute('data-page', page);
			loadedPage = new Pages[page](ctx);
		});
	} else {
		loadPage('login');
	}
};

window.addEventListener('DOMContentLoaded', () => {
	const ctx = new Context();

	ctx.loadPage = loadPage;

	storage.get('apidetails', (details) => {
		if (details && details.hasOwnProperty('token') && details.hasOwnProperty('host')) {
			ctx.apidetails = details;
			loadPage(null, ctx);
		} else {
			loadPage('login', ctx);
		}
	});
});
