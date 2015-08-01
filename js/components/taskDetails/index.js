'use strict';

import React from 'react';
import moment from 'moment';

const {div, img, span} = React.DOM;

const formatTime = ts => {
	return moment.unix(ts).format('HH:mm, MMM Do YYYY');
}

const usertag = user => {
	return div({
		className: 'usertag'
	},
		user.image ? img({
			className: 'usertag-image',
			src: user.image
		}) : null,
		user.name ? span({
			className: 'usertag-name'
		}, user.name) : null
	);
}

const parseComment = activity => {
	// TODO: include image

	return div({
		className: 'task-comment'
	},
		usertag({
			name: 'Mischa', // activity.authorPHID;
			image: 'https://yt3.ggpht.com/-jsd4MAxrXXU/AAAAAAAAAAI/AAAAAAAAAAA/pTclgftkJ_o/s88-c-k-no/photo.jpg'
		}),
		activity.comments,
		formatTime(activity.dateCreated)
	);
}

const parseDetails = (activity, ts) => {
	if (ts === activity.dateCreated) return null;

	switch (activity.transactionType) {
		case 'core:comment':
			return parseComment(activity);
		default:
			console.log(activity.transactionType);
			return;
	}
}

export default parseDetails;
