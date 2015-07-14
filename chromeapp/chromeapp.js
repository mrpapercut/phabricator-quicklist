if (!Object.assign) {
	Object.defineProperty(Object, 'assign', {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function(target) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert first argument to object');
			}

			var to = Object(target);
			for (var i = 1; i < arguments.length; i++) {
				var nextSource = arguments[i];
				if (nextSource === undefined || nextSource === null) {
					continue;
				}
				nextSource = Object(nextSource);

				var keysArray = Object.keys(Object(nextSource));
				for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
					var nextKey = keysArray[nextIndex];
					var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if (desc !== undefined && desc.enumerable) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
			return to;
		}
	});
}

window.notify = {
	create: function(options, callback) {
		var defOpts = {
			type: 'basic',
			title: 'Default title',
			message: '',
			iconUrl: ''
		}

		chrome.notifications.create(null, Object.assign(defOpts, options), callback);
	},

	onClosed: function(callback) {
		chrome.notifications.onClosed.addListener(callback);
	},

	onClicked: function(callback) {
		chrome.notifications.onClicked.addListener(callback);
	}
}

window.notify.onClosed(function(id, byUser) {
	chrome.app.window.current().drawAttention();
});

window.notify.onClicked(function(id) {
	chrome.app.window.current().show();
});

document.querySelector('.window-action#minimize').addEventListener('click', function() {
	chrome.app.window.current().minimize();
});

document.querySelector('.window-action#close').addEventListener('click', function() {
	chrome.app.window.current().close();
});