'use strict';

import React from 'react';

const {div, img, span, button} = React.DOM;

const Header = React.createClass({
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
