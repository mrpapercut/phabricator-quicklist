'use strict';

import React from 'react';

import {GetContext, StateStream} from '../mixins';
import storage from '../lib/storage';

const {div, a} = React.DOM;

const Users = React.createClass({

	mixins: [GetContext, StateStream],

	stateStream() {
		return this.ctx().stores.users
			.map(store => ({
				users: store.getActiveUsers() || [],
				curUser: store.getCurrentUser()
			}));
	},

	createUser(user) {
		return div({
			key: user.phid,
			className: 'user'
		},
			a({
				href: user.uri,
				target: '_blank'
			}, user.userName)
		);
	},

	render() {
		return (
			div({},
				this.state.users.map(user => this.createUser(user))
			)
		);
	}
});

export default Users;
