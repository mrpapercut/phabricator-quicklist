window.notify = {
	create: function(options, callback) {
		var opts = {
			type: 'basic',
			title: options.title || 'Default title',
			message: options.message || '',
			iconUrl: options.icon || 'icons/logo128.png'
		},
		notificationId = [] + Date.now(),
		clear = function(id) {
			chrome.notifications.clear(id)
		},
		removeListeners = function() {
			chrome.notifications.onClicked.removeListener(onClick);
			chrome.notifications.onClosed.removeListener(onClose);
		},
		onClick = function(id) {
			if (id === notificationId) {
				removeListeners();
				clear(id);
				options.onClick(id);
			}
		},
		onClose = function(id, byUser) {
			if (id === notificationId) {
				removeListeners();
				clear(id);
				options.onClose(id, !!byUser);
			}
		};

		if (typeof options.onClick === 'function') {
			chrome.notifications.onClicked.addListener(onClick);
		}

		if (typeof options.onClose === 'function') {
			chrome.notifications.onClosed.addListener(onClose);
		}

		chrome.notifications.onClicked.addListener(function(id) {
			chrome.app.window.current().show();
		});

		chrome.notifications.create(notificationId, opts, callback);
	}
}

document.querySelector('.window-action#minimize').addEventListener('click', function() {
	chrome.app.window.current().minimize();
});

document.querySelector('.window-action#close').addEventListener('click', function() {
	chrome.app.window.current().close();
});