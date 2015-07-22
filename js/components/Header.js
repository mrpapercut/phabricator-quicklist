'use strict';

import React from 'react';

import {GetContext} from '../mixins';
import storage from '../lib/storage';

const {div, button} = React.DOM;

const Header = React.createClass({

	mixins: [GetContext],

	componentWillMount() {

	},

	logout(e) {
		e.preventDefault();

		const ctx = this.ctx();
		storage.clear(() => ctx.loadPage('login', ctx));
	},

	render() {
		return div({},
			button({
				id: 'logoutbutton',
				type: 'button',
				onClick: this.logout
			}, 'Log out')
		);
	}
});

export default Header;
