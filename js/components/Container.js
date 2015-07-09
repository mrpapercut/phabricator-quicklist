"use strict";

import React from "react";

import {GetContext} from '../mixins';

import Users from './Users';

const {div} = React.DOM;
const cf = React.createFactory;

const users = cf(Users);

const Container = React.createClass({

	mixins: [GetContext],

	getInitialState() {
		return {

		}
	},

	render() {
		return (
			div({},
				users({ctx: this.ctx()})
			)
		);
	}
});

export default Container;
