'use strict';

import React from 'react';

import * as actions from '../actions/AppActions';

const {div, img, span, button} = React.DOM;

const Header = React.createClass({

	componentDidMount() {
		/*
		const currentUser = this.ctx().getCurrentUser();

		this.setState({
			currentUser: currentUser
		});

		if (currentUser.image) {
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
		}
		*/
	},

	logout(e) {
		e.preventDefault();

		const ctx = this.props.ctx;
		storage.clear(() => ctx.loadPage('login', ctx));
	},

	getAvatar(user) {
		if (!user) return null;

		const imgPHID = user.image.match(/(PHID-FILE-[a-z0-9]+)\//)[1];

		const redux = this.props.ctx.getRedux();
		redux.dispatch(actions.getImage(imgPHID));
		console.log(this.props);
		// this.props.getAvatar(imgPHID);
	},

	render() {
		const {appStore} = this.props;
		const currentUser = appStore.getCurrentUser() || {};

		return div({},
			// currentUser.image ? this.getAvatar(currentUser) : null,
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
