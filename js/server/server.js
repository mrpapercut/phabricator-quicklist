'use strict';

import Bacon		from 'baconjs';
import request		from 'superagent';

import {
	defaultEnd as end
} from '../lib/server';

const apiurl = process.env.NODE_ENV === 'chrome'
	? 'http://localhost/phabricator-quicklist/php/Api.php'
	: './php/Api.php';

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

export function getUserByName(name) {
	return callApi({
		query: 'getUserByName',
		name: name
	});
}

export function getTasks(details) {
	return callApi({
		query: 'getTasks',
		author: details.author || null,
		project: details.project || null,
		owner: details.owner || null,
		status: details.status || 'status-open'
	});
}

export function getTaskInfo(id) {
	return callApi({
		query: 'getTaskInfo',
		id: id
	});
}

export function whoami() {
	return callApi({
		query: 'whoami'
	});
}
