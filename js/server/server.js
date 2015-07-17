'use strict';

import Bacon	from 'baconjs';
import request	from 'superagent';
import qs		from 'qs';

import storage	from '../lib/storage';

import {
	defaultEnd as end
} from '../lib/server';

const apiurl = 'http://localhost:3000/';

function callApi(req, params, cb, apidetails) {
	params = params || {};

	function doRequest(req, params, cb, apidetails) {
		request
		.get(apiurl + req)
		.query(qs.stringify(params))
		.set('Auth', btoa(JSON.stringify({
			token: apidetails.token, // 'api-nkqei2lmty3c4gjbru2n5jjlyiie',
			host: apidetails.host // 'http://symbaloo.tw:8085'
		})))
		.set('Accept', 'application/json')
		.end(end(cb));
	}

	if (!apidetails) {
		storage.get('apidetails', apidetails => {
			doRequest(req, params, cb, apidetails);
		});
	} else {
		doRequest(req, params, cb, apidetails);
	}

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

export function getTasks(details, callback) {
	return callApi('getTasks', {
		authorPHIDs: details.author || null,
		projectPHIDs: details.project || null,
		ownerPHIDs: details.owner || null,
		status: details.status || 'status-open'
	}, callback);
}

export function getTaskInfo(id) {
	return callApi('getTaskInfo', {
		task_id: id
	});
}

export function whoami(apidetails, cb) {
	return callApi('whoami', null, cb, apidetails);
}

export function testCredentials(apidetails, cb) {
	return callApi('testCredentials', null, cb, apidetails);
}
