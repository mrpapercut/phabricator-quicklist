'use strict';

import Pages	from '../pages';

let loadedPage = null;

const loadPage = (page, ctx, params) => {
	const {storage} = ctx;

	if (!page && ctx.apidetails) {
		storage.get('lastpage', (lastpage) => {
			if (lastpage && Pages[lastpage] && lastpage !== 'login' && lastpage !== 'taskdetails') {
				loadPage(lastpage, ctx, params);
			} else {
				loadPage('chat', ctx, params);
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

export default loadPage;
