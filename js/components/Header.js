'use strict';

import React from 'react';

import {GetContext} from '../mixins';
import storage from '../lib/storage';

const {div, img, span, button} = React.DOM;

import {
	getImage
} from '../server/server';

const Header = React.createClass({

	mixins: [GetContext],

	getInitialState() {
		return {
			currentUser: {},
			userImage: null
		}
	},

	componentDidMount() {
		const currentUser = this.ctx().getCurrentUser();

		this.setState({
			currentUser: currentUser
		});

		if (currentUser.image) {
			const imagePHID = currentUser.image.match(/(PHID-FILE-[a-z0-9]+)\//)[1];

			getImage(imagePHID, (err, res) => {
				if (err) {
					console.warn(err);
				} else {
					this.setState({
						userImage: 'data:image/png;base64,' + res.data
					});
				}
			});
		}
	},

	logout(e) {
		e.preventDefault();

		const ctx = this.ctx();
		storage.clear(() => ctx.loadPage('login', ctx));
	},

	render() {
		return div({},
			this.state.userImage ? img({
				src: this.state.userImage,
				className: 'userimg'
			}) : null,
			span({
				className: 'username'
			}, this.state.currentUser.userName || null),
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
