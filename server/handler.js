'use strict';

import ConduitAPI from './conduitAPI';
const api = new ConduitAPI();

export default class {
	listen(req, res) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers', 'Auth');

		if (!req.headers['auth']) {
			res.end('Unauthorized');
		} else {
			api.handle(req, (err, data) => {
				if (err) {
					console.log('Error', err);
					res.end(JSON.stringify({
						status: 'error',
						error: err,
						request: req.url
					}));
				} else if (data && data.result) {
					res.end(JSON.stringify({
						status: 'success',
						data: data.result
					}));
				} else {
					if (data) console.log('no result', data);
					res.statusCode = 400;
					res.end(JSON.stringify({
						status: 'error',
						error: 'No result',
						request: req.url
					}));
				}
			});
		}
	}
}
