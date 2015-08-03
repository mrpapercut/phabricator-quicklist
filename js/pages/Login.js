'use strict';

import React from 'react';

import storage from '../lib/storage';

import {
	whoami,
	testCredentials
} from '../server';

import LoginPage from '../components/LoginPage';
const loginPage = React.createFactory(LoginPage);

export default class Login {
	constructor(ctx) {
		const storeApiDetails = details => {
			storage.set('apidetails', details, res => {
				ctx.loadPage('chat', ctx);
			});
		};

		const storeCurrentUser = (user, cb) => {
			storage.set('curuser', user, res => {
				cb();
			});
		};

		React.render(loginPage({
			ctx: ctx,
			storeCurrentUser: storeCurrentUser,
			storeApiDetails: storeApiDetails,
			testCredentials: testCredentials,
			getWhoami: whoami
		}), document.getElementById('container'));
	}
}
