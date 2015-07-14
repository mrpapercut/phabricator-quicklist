'use strict';

import Bacon		from 'baconjs';
import request		from 'superagent';

import {
	defaultEnd as end
} from '../lib/server';

const apiurl = 'http://localhost:8000/phabricator-quicklist/php/Api.php';

function callApi(query) {
	return Bacon.fromNodeCallback(cb => {
		request
			.get(apiurl)
			.query(query)
			.set('Accept', 'application/json')
			.end(end(cb));
	});
}

export function listProjects() {
	return callApi({
		query: 'listProjects'
	});
}

export function listUsers() {
	return callApi({
		query: 'listUsers'
	});
}

export function getAssignedTasks(details) {
	return callApi({
		query: 'getAssignedTasksByUser',
		owner: details.owner,
		project: details.project,
		status: details.status || 'status-open'
	});
}

export function whoami() {
	return callApi({
		query: 'whoami'
	});
}
