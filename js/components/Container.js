"use strict";

import React from "react";

import contains from 'ramda/src/contains';

import {GetContext, StateStream} from '../mixins';
import notifications from '../lib/notifications';

import Users from './Users';
import Tasks from './Tasks';
import Projects from './Projects';

const {div, button} = React.DOM;
const cf = React.createFactory;

const users = cf(Users);
const tasks = cf(Tasks);
const projects = cf(Projects);

const Container = React.createClass({

	mixins: [GetContext, StateStream],

	stateStream() {
		return this.ctx().stores.appstore
			.map(store => ({
				currentPage: store.getCurrentPage(),
				notifications: []
			})
		);
	},

	loadPage() {
		console.log(this.state.currentPage);
	},

	notify() {
		const notif = notifications.create({
			title: 'Mischa sent you a message',
			message: 'ooooh fuck yeah',
			onClick: this.notifyClick
		}, (id) => (this.state.notifications.push(id)));
	},

	notifyClick(id) {
		console.log(id, this.state.notifications);
		if (contains(id, this.state.notifications)) {
			console.log('found the notification:', id);
		}
	},

	render() {
		const ctx = this.ctx();

		return (
			div({},
				button({
					ref: 'notify',
					onClick: () => this.notify()
				}, 'Notify!'),
				users({ctx: ctx}),
				tasks({ctx: ctx}),
				projects({ctx: ctx})
			)
		);
	}
});

export default Container;
