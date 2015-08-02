'use strict';

import React from 'react';

const {div, span} = React.DOM;

const ChatMessage = React.createClass({
	render() {
		return (
			div({
				className: this.props.type === 'sent' ? 'message sent' : 'message received',
				key: this.props.id
			},
				span({
					className: 'sender'
				}, this.props.from),
				div({
					className: 'messageContent'
				}, this.props.msg)
			)
		);
	}
});

export default ChatMessage;
