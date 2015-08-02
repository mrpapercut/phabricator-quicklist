'use strict';

import React from 'react';

import ChatMessage from './chat/ChatMessage';
const chatMessage = React.createFactory(ChatMessage);

const {div, input, button} = React.DOM;

const ChatPage = React.createClass({

	componentWillMount() {
		this.ws = this.props.ctx.ws;
		this.connect();
	},

	componentDidUpdate() {
		const messagesbox = React.findDOMNode(this.refs['messagesbox']);
		messagesbox.scrollTop = parseInt(messagesbox.scrollHeight - 80, 10);
	},

	connect() {
		this.ws.onopen = () => {
			this.listener();
			this.testConnection();
		};
	},

	listener() {
		this.ws.onmessage = (rec, flags) => {
			if (flags) console.warn(flags);

			const message = JSON.parse(rec.data);
			message.id = +new Date;

			if (message.type === 'sent' || message.type === 'received') this.props.addMessage(message);
		};
	},

	testConnection() {
		this.props.ctx.storage.get('curuser', res => {
			this.userPHID = res.phid;

			this.send('registerconnection', {
				userPHID: res.phid,
				apidetails: this.props.ctx.apidetails
			});
		});
	},

	send(action, data) {
		this.ws.send(JSON.stringify({
			userPHID: this.userPHID,
			action: action,
			data: data
		}));
	},

	sendMessage(recipientList, message) {
		this.send('sendmessage', {
			to: recipientList,
			message: message
		});

		this.props.addMessage({
			id: +new Date,
			type: 'sent',
			msg: message,
			from: 'Me'
		});
	},

	submit() {
		const msgElement = React.findDOMNode(this.refs['message']);

		this.sendMessage(['PHID-USER-w4nlajeutuuhnigt33dx'], msgElement.value);


		msgElement.value = null;
	},

	listenEnter(e) {
		if (e.keyCode === 13) this.submit();
	},

	render() {
		const {chatStore} = this.props;

		const data = chatStore.getMessages().valueSeq().toArray().map(chatMessage);

		return (
			div({
				className: 'chatroom'
			},
				div({
					ref: 'messagesbox',
					className: 'messagesbox',

				}, data),
				input({
					type: 'text',
					ref: 'message',
					onKeyDown: this.listenEnter
				})
			)
		);
	}
});

export default ChatPage;
