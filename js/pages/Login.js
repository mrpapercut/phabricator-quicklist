'use strict';

import React from 'react';
import Bacon from 'baconjs';

import storage from '../lib/storage';

import {
	whoami,
	testCredentials
} from '../server/server';

import LoginPage from '../components/LoginPage';
const loginPage = React.createFactory(LoginPage);

export default class Login {
	constructor(ctx) {
		const storeApiDetails = (details) => {
			storage.set('apidetails', details, (res) => {
				ctx.loadPage('tasks', ctx);
			});
		}

		React.render(loginPage({
			ctx: ctx,
			storeApiDetails: storeApiDetails,
			testCredentials: testCredentials,
			getWhoami: whoami
		}), document.getElementById('container'));
	}
}
