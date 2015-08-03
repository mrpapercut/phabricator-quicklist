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
			const userCustomAvatar = user.image.match(/(PHID-FILE-[a-z0-9]+)\//);

			if (userCustomAvatar) {
				redux.dispatch(actions.getImage(userCustomAvatar[1]));
			}
			redux.dispatch(actions.setCurrentUser(user));
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
