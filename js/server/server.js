'use strict';

import Bacon		from 'baconjs';
import request		from 'superagent';

import {
	defaultEnd as end
} from '../lib/server';

const apiurl = 'http://localhost:8000/phabricator-quicklist/php/Api.php';

export function loadUsers() {
	return Bacon.fromNodeCallback(cb => {
		request
			.get(apiurl)
			.query({
				query: 'listUsers'
			})
			.set('Accept', 'application/json')
			.end(end(cb))
	});
}

export function getAssignedTasks(details) {
	return Bacon.fromNodeCallback(cb => {
		request
			.get(apiurl)
			.query({
				query: 'getAssignedTasksByUser',
				owner: details.owner,
				project: details.project,
				status: details.status || 'status-open'
			})
			.set('Accept', 'application/json')
			.end(end(cb))
	});
}
