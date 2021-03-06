'use strict';

import React from 'react';

import {GetContext} from '../mixins';

const {div, form, input, button, span} = React.DOM;

const LoginPage = React.createClass({

	mixins: [GetContext],

	getInitialState() {
		return {
			whoami: null,
			errors: []
		};
	},

	resetErrors(e) {
		this.setState({
			errors: []
		});
	},

	onSubmit(e) {
		e.preventDefault();
		let errors = [];

		for(let ref in this.refs) {
			let domnode = this.refs[ref].getDOMNode();
			if (!domnode.value) {
				errors.push(ref);
			}
		}

		this.setState({
			errors: errors
		});

		if (errors.length === 0) {
			const apidetails = {
				token: React.findDOMNode(this.refs.token).value,
				host: React.findDOMNode(this.refs.host).value
			};

			this.props.testCredentials(apidetails, (err, res) => {
				if (err) {
					errors.push('host');
					this.setState({
						errors: errors
					});
				} else {
					this.props.getWhoami(apidetails, (err, res) => {
						if (err) {
							errors.push('token');
							this.setState({
								errors: errors
							});
						} else {
							this.props.storeCurrentUser(res.data, () =>
								this.props.storeApiDetails(apidetails)
							);
						}
					});
				}
			});
		}
	},

	isError(ref) {
		return this.state.errors.indexOf(ref) !== -1 ? 'error' : null;
	},

	render() {

		return (
			div({},
				form({
					onSubmit: this.onSubmit
				},
					input({
						type: 'text',
						placeholder: 'Conduit API key',
						ref: 'token',
						className: this.isError('token'),
						onFocus: this.resetErrors
					}),
					input({
						type: 'url',
						placeholder: 'Phabricator url',
						ref: 'host',
						className: this.isError('host'),
						onFocus: this.resetErrors
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
