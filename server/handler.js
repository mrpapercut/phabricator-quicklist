'use strict';

import ConduitAPI from './conduitAPI';
const api = new ConduitAPI();

export default class {
	constructor() {

	}

	listen(req, res) {
		api.handle(req.url, (err, data) => {
			if (err) console.log(err);
			else if (data && data.result) res.end(JSON.stringify(data.result));
			else {
				if (data) console.log(data);
				res.end(null);
			}
		});
	}
}
