'use strict';

import React	from 'react';

import Context	from './Context';
import {createReduxConnector} from './lib/createReduxConnector';

import loadPage from './lib/loadPage';

import {appStore} from './stores/AppStore';
import {phidStore} from './stores/phidStore';
import * as actions from './actions/AppActions';

import Header	from './components/Header';
const header = React.createFactory(Header);

let loadedPage = null;

const loadPage = function(page, ctx, params) {
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

window.addEventListener('DOMContentLoaded', () => {
	const ctx = new Context();
	const {storage} = ctx;
	const redux = ctx.getRedux();

	ctx.loadPage = loadPage;

	ctx.registerStores({
		appStore: appStore
	});

	storage.get('curuser', user => {
		if (user) {
			redux.dispatch(actions.setCurrentUser(user));
			redux.dispatch(actions.getImage(user.image.match(/(PHID-FILE-[a-z0-9]+)\//)[1]));
		}
	});

	storage.get('apidetails', details => {
		if (details
			&& details.hasOwnProperty('token') && details.token !== ''
			&& details.hasOwnProperty('host') && details.host !== '') {
			ctx.apidetails = details;

			loadPage(null, ctx);
		} else {
			loadPage('login', ctx);
		}
	});

	React.render(
		React.createFactory(createReduxConnector({
			actions: actions,
			component: header
		}))({ctx}), document.getElementById('header')
	);
});
