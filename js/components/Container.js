"use strict";

import React from "react";

import {GetContext} from '../mixins';

import Users from './Users';
import Tasks from './Tasks';
import Projects from './Projects';

const {div} = React.DOM;
const cf = React.createFactory;

const users = cf(Users);
const tasks = cf(Tasks);
const projects = cf(Projects);

const Container = React.createClass({

	mixins: [GetContext],

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
