'use strict';

import React from 'react';

import {
	getFile
} from '../server';

const {div, img, span, button} = React.DOM;

const Header = React.createClass({

	getInitialState() {
		return {
			currentUser: this.props.appStore.getCurrentUser()
		}
	},

	getAvatar(currentUser) {
		const imagePHID = currentUser.image.match(/(PHID-FILE-[a-z0-9]+)\//)[1];

		getFile(imagePHID, (err, res) => {
			if (err) {
				console.warn(err);
			} else {
				this.setState({
					userImage: 'data:image/png;base64,' + res.data
				});
			}
		});
	},

	logout(e) {
		e.preventDefault();

		const ctx = this.props.ctx;
		ctx.storage.clear(() => ctx.loadPage('login', ctx));
	},

	render() {
		const {appStore} = this.props;
		const currentUser = appStore.getCurrentUser() || {};
		const avatarURI = appStore.getAvatar();

		return div({},
			avatarURI ? img({
				src: avatarURI,
				className: 'useravatar'
			}) : null,
			span({
				className: 'username'
			}, currentUser.userName || null),
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
