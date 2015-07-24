'use strict';

import React	from 'react';

import Context	from './Context';
import {createReduxConnector} from './lib/createReduxConnector';

import Pages	from './pages';

import {appStore} from './stores/AppStore';
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
	const {storage} = ctx;
	const redux = ctx.getRedux();

	ctx.loadPage = loadPage;

	ctx.registerStores({
		appStore: appStore
	});

	storage.get('curuser', user => {
		if (user) redux.dispatch(actions.setCurrentUser(user));
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
			component: header,
			getAvatar: (imgPHID) => redux.dispatch(actions.getImage(imgPHID))
		}))({ctx}), document.getElementById('header')
	);
});
