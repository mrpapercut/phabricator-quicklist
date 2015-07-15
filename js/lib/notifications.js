'use strict';

import assign from 'object-assign';

let isAllowed = Notification.permission === 'granted';

if (!isAllowed && Notification.permission !== 'denied') {
	Notification.requestPermission(permission => (isAllowed = permission === 'granted'));
}

const notifications = window.notify || {
	create(options, callback) {
		if (!isAllowed) return false;

		let defOpts = {
			type: 'basic',
			title: 'Default title',
			message: '',
			iconUrl: 'icons/logo128.png'
		};

		let opts = assign(defOpts, options || {});

		let notif = new Notification(opts.title, {
			body: opts.message,
			icon: opts.iconUrl,
			tag: +new Date
		});

		notif.closingTimeout = window.setTimeout(() => {
			if (typeof options.onClose === 'function') {
				notif.removeEventListener('close', options.onClose);
				options.onClose({timeout: true});
			}

			notif.close();
		}, 5000);

		if (typeof options.onClick === 'function') {
			notif.addEventListener('click', (event) => {
				window.clearTimeout(notif.closingTimeout);
				if (event.target.tag === notif.tag) options.onClick(notif.tag);
			});
		}

		if (typeof options.onClose === 'function') {
			notif.addEventListener('close', (e) => {
				window.clearTimeout(notif.closingTimeout);
				e.timeout = false;
				options.onClose(e)
			});
		}

		callback(notif.tag);
	}
}

export default notifications;
