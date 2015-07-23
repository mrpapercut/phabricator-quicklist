'use strict';

import React	from 'react';

import Context	from './Context';
import Pages	from './pages';
import storage	from './lib/storage';

import Header	from './components/Header';
const header = React.createFactory(Header);

let loadedPage = null;

const loadPage = function(page, ctx, params) {
	if (!page && ctx.apidetails) {
		storage.get('lastpage', (lastpage) => {
			if (lastpage && Pages[lastpage] && lastpage !== 'login' && lastpage !== 'taskdetails') {
				loadPage(lastpage, ctx, params);
			} else {
				loadPage('tasks', ctx, params);
			}
		});
	} else if (page && Pages[page]) {
		storage.set('lastpage', page, () => {
			document.body.setAttribute('data-page', page);
			loadedPage = new Pages[page](ctx, params);
		});
	} else {
		loadPage('login', ctx);
	}
};

window.addEventListener('DOMContentLoaded', () => {
	const ctx = new Context();

	ctx.loadPage = loadPage;

	React.render(header({
		ctx: ctx
	}), document.getElementById('header'));

	storage.get('apidetails', (details) => {
		if (details
			&& details.hasOwnProperty('token') && details.token !== ''
			&& details.hasOwnProperty('host') && details.host !== '') {
			ctx.apidetails = details;

			loadPage(null, ctx);
		} else {
			loadPage('login', ctx);
		}
	});

});
