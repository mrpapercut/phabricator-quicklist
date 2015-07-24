'use strict';

import request from 'superagent';
import assign from 'object-assign';
import querystring from 'qs';

import {defaultEnd as end} from '../js/lib/server';

function atob(str) {
	return new Buffer(str, 'base64').toString('binary');
}

function imgToDataURI(buffer, type) {
	var base64data = new Buffer(buff, 'binary').toString('base64');
	if (base64data) return 'data:' + type + ';base64,' + base64data;
	else return false;
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
			.send(querystring.stringify(this.formatQuery(params)))
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

	getFile(callback, params) {
		this.doRequest('file.download', params, callback);
	}

	testCredentials(callback) {
		this.doRequest('conduit.ping', null, callback);
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
	 *   task_id: Int
	 * }
	 */
	getTaskInfo(callback, params) {
		this.doRequest('maniphest.info', {task_id: parseInt(params.task_id, 10)}, callback);
	}

	/**
	 * Get task activity by id
	 * @param params
	 * {
	 *   ids: Array
	 * }
	 */
	getTaskActivity(callback, params) {
		this.doRequest('maniphest.gettasktransactions', {ids: [params.id]}, callback);
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
			status: params.status || 'status-open'
		}

		if (params.authorPHIDs) defParams.authorPHIDs = [params.authorPHIDs];
		if (params.ownerPHIDs) defParams.ownerPHIDs = [params.ownerPHIDs];
		if (params.projectPHIDs) defParams.projectPHIDs = [params.projectPHIDs];


		this.doRequest('maniphest.query', defParams, callback);
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
			'getTasks': this.getTasks,
			'getTaskInfo': this.getTaskInfo,
			'getTaskActivity': this.getTaskActivity,
			'testCredentials': this.testCredentials,
			'getFile': this.getFile
		}

		if (validUris[method]) validUris[method].bind(this)(callback, querystring.parse(params));
		else callback(null);
	}
}
