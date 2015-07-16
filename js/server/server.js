'use strict';

import Bacon	from 'baconjs';
import request	from 'superagent';
import qs		from 'qs';

import {
	defaultEnd as end
} from '../lib/server';

const apiurl = 'http://localhost:3000/';

function callApi(req, params) {
	params = params || {};

	return Bacon.fromNodeCallback(cb => {
		request
			.get(apiurl + req)
			.query(qs.stringify(params))
			.set('Accept', 'application/json')
			.end(end(cb));
	});
}

export function listProjects() {
	return callApi('listProjects');
}

export function listUsers() {
	return callApi('listUsers');
}

export function getUserByName(name) {
	return callApi('getUserByName', {
		usernames: name
	});
}

export function getTasks(details) {
	return callApi('getTasks', {
		authorPHIDs: details.author || null,
		projectPHIDs: details.project || null,
		ownerPHIDs: details.owner || null,
		status: details.status || 'status-open'
	});
}

export function getTaskInfo(id) {
	return callApi('getTaskInfo', {
		task_id: id
	});
}

export function whoami() {
	return callApi('whoami');
}
