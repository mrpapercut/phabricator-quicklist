'use strict';

import Bacon		from 'baconjs';
import request		from 'superagent';

import {
	defaultEnd as end
} from '../lib/server';

export function loadUsers() {
	return Bacon.fromNodeCallback(cb => {
		request
			.get('./php/Api.php?query=listUsers')
			.set('Accept', 'application/json')
			.end(end(cb))
	});
}
