"use strict";

import React from "react";

const {div, hr, a} = React.DOM;
const cf = React.createFactory;

const Container = React.createClass({
	getInitialState() {
		return {
			text: this.props.ctx.appName
		}
	},

	render() {
		return (
			div({},
				this.state.text,
				hr(),
				'w00t',
				hr(),
				a({
					href: 'http://symbaloo.tw:8085'
				}, 'The Phab')
			)
		);
	}
});

export default Container;
