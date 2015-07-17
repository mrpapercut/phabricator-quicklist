'use strict';

import request from 'superagent';
import assign from 'object-assign';
import qs from 'qs';

import {defaultEnd as end} from '../js/lib/server';

function atob(str) {
	return new Buffer(str, 'base64').toString('binary');
}

export default class ConduitAPI {
	setTokens(details) {
		details = JSON.parse(atob(details['auth']));
		this.token = details.token;
		this.host = details.host;
	}

	doRequest(uri, params, callback) {
		params = params || {};

		request
			.post(this.host + '/api/' + uri)
			.send(qs.stringify(this.formatQuery(params)))
			.end(end(callback));
	}

	formatQuery(params) {
		let paramsObject = {
			"__conduit__": {
				"token": this.token
			}
		}

		return {
			params: JSON.stringify(assign(paramsObject, params)),
			output: 'json',
			__conduit__: 1
		};
	}

	getWhoami(callback) {
		this.doRequest('user.whoami', null, callback);
	}

	listProjects(callback) {
		this.doRequest('project.query', null, callback);
	}

	listUsers(callback) {
		this.doRequest('user.query', null, callback);
	}

	/**
	 * Finds users by name
	 * @param params
	 * {
	 *   usernames: Array
	 * }
	 */
	getUserByName(callback, params) {
		this.doRequest('user.query', params, callback);
	}

	/**
	 * Get task by id
	 * @param params
	 * {
	 *   task_id: String
	 * }
	 */
	getTaskInfo(callback, params) {
		this.doRequest('maniphest.info', params, callback);
	}

	/**
	 * Get tasks by owner, author, project, status
	 * @param params
	 * {
	 *   authorPHIDs: Array (optional)
	 *   ownerPHIDS: Array (optional)
	 *   projectPHIDs: Array (optional)
	 *   status: String (default: status-open)
	 * }
	 */
	getTasks(callback, params) {
		const defParams = {
			authorPHIDs: params.authorPHIDs || null,
			ownerPHIDs: params.ownerPHIDs || null,
			projectPHIDs: params.projectPHIDs || null,
			status: params.status || 'status-open'
		}

		this.doRequest('maniphest.query', defParams, callback);
	}

	testCredentials(callback) {
		this.doRequest('conduit.ping', null, callback);
	}

	handle(req, callback) {
		const matched = req.url.match(/\/([a-zA-Z]+)(\?(.*))?/);
		if (!matched) callback(null);

		this.setTokens(req.headers);

		const [url, method, qs, params] = matched.map(_ => _);

		const validUris = {
			'whoami': this.getWhoami,
			'listProjects': this.listProjects,
			'listUsers': this.listUsers,
			'getUserByName': this.getUserByName,
			'getTaskInfo': this.getTaskInfo,
			'getTasks': this.getTasks,
			'testCredentials': this.testCredentials
		}

		if (validUris[method]) validUris[method].bind(this)(callback, params);
		else callback(null);
	}
}
