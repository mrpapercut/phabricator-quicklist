'use strict';

import React from 'react';
import Bacon from 'baconjs';

import storage from '../lib/storage';

import {whoami} from '../server/server';
import AppStore from '../stores/AppStore';

import LoginPage from '../components/LoginPage';
const loginPage = React.createFactory(LoginPage);

export default class Login {
	constructor(ctx) {
		const storeApiDetails = (details) => {
			storage.set('apidetails', details, (res) => {
				ctx.loadPage();
			});
		}

		// TODO: call whoami() from baconbus

		const whoamiResult = whoami();
		ctx.stores.appstore = Bacon.update(
			new AppStore(),
			[whoamiResult], (store, data) => store.setWhoami(data)
		);

		React.render(loginPage({
			ctx: ctx,
			storeApiDetails: storeApiDetails
		}), document.getElementById('container'));
	}
}
