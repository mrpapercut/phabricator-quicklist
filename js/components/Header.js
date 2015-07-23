'use strict';

import React from 'react';

import {GetContext} from '../mixins';
import storage from '../lib/storage';

const {div, img, span, button} = React.DOM;

const Header = React.createClass({

	mixins: [GetContext],

	getInitialState() {
		return {
			currentUser: {}
		}
	},

	componentDidMount() {
		const ctx = this.ctx();
		this.setState({
			currentUser: ctx.getCurrentUser()
		});
	},

	logout(e) {
		e.preventDefault();

		const ctx = this.ctx();
		storage.clear(() => ctx.loadPage('login', ctx));
	},

	render() {
		return div({},
			// Loading images doesn't work in chromeapp
			/*
			img({
				src: this.state.currentUser.image,
				className: 'userimg'
			}),
			*/
			span({
				className: 'username'
			}, this.state.currentUser.userName),
			button({
				id: 'logoutbutton',
				type: 'button',
				onClick: this.logout,
				className: 'fa fa-sign-out',
				title: 'Log out'
			})
		);
	}
});

export default Header;
