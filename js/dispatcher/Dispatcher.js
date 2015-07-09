'use strict';

import Bacon from 'baconjs';

import assocPath from 'ramda/src/assocPath';
import path      from 'ramda/src/path';
import reduce    from 'ramda/src/reduce';

class Dispatcher {

	constructor() {
		this.streams = {};
	}

	create(name, creator) {
		this.streams = assocPath(name.split('.'), creator(this.streams), this.streams);
	}

	createAll(creator) {
		var newStreams = creator(this.streams);
		this.streams = reduce(
			(streams, name) => assocPath(name.split('.'), newStreams, streams),
			this.streams,
			Object.keys(newStreams)
		);
	}

	get(name) {
		return path(name.split('.'), this.streams);
	}

	getAll() {
		return this.streams;
	}
}

export default Dispatcher;
