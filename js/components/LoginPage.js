'use strict';

import React from 'react';

import {GetContext, StateStream} from '../mixins';

const {div, form, input, button, span} = React.DOM;

const LoginPage = React.createClass({

	mixins: [GetContext, StateStream],

	stateStream() {
		return this.ctx().stores.appstore.map(store => ({
			whoami: store.getWhoami()
		}));
	},

	onSubmit(e) {
		e.preventDefault();
		for(let ref in this.refs) {
			console.log(this.refs[ref].getDOMNode().value);
		}
	},

	render() {
		return (
			div({},
				form({
					action: this.onSubmit
				},
					input({
						type: 'text',
						placeholder: 'Conduit API key',
						ref: 'apikey'
					}),
					input({
						type: 'url',
						placeholder: 'Phabricator url',
						ref: 'hosturl'
					}),
					button({
						type: 'button',
						onClick: this.onSubmit
					}, 'Submit')
				),
				span(null, this.state.whoami)
			)
		);
	}
});

export default LoginPage;
