'use strict';

import React from 'react';

import {GetContext, StateStream} from '../mixins';

const {div, img, a} = React.DOM;

const Users = React.createClass({

	mixins: [GetContext, StateStream],

	stateStream() {
		return this.ctx().stores.users
			.map(store => ({
				users: store.getUsers() || []
			}));
	},

	createUser(user) {
		return div({
			className: 'user'
		},
			img({
				src: user.image
			}),
			a({
				href: user.uri
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
