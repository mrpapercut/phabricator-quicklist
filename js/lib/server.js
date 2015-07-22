'use strict';

export function onEnd(onSuccess, onError) {
	return res => {
		if (res.status === 200) {
			onSuccess(res);
		} else {
			onError(res);
		}
	};
}

export function defaultEnd(cb, errorMessage = 'Could not load') {
	return onEnd(
		res => cb(null, res.body || JSON.parse(res.text)),
		_ => cb(_.body || new Error(errorMessage))
	);
}