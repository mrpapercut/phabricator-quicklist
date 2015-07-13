"use strict";

import React from "react";

import {GetContext, StateStream} from '../mixins';

import Users from './Users';
import Tasks from './Tasks';
import Projects from './Projects';

const {div} = React.DOM;
const cf = React.createFactory;

const users = cf(Users);
const tasks = cf(Tasks);
const projects = cf(Projects);

const Container = React.createClass({

	mixins: [GetContext, StateStream],

	stateStream() {
		return this.ctx().stores.appstore
			.map(store => ({
				currentPage: store.getCurrentPage()
			})
		);
	},

	loadPage() {
		console.log(this.state.currentPage);
	},

	render() {
		const ctx = this.ctx();

		return (
			div({},
				users({ctx: ctx}),
				tasks({ctx: ctx}),
				projects({ctx: ctx})
			)
		);
	}
});

export default Container;
