'use strict';

const isChrome = typeof chrome !== 'undefined' && chrome.storage;
const localstorage = isChrome ? chrome.storage.local : window.localStorage;

const browserStorage = {
	set(name, data, callback) {
		callback(localstorage.setItem(name, JSON.stringify(data)));
	},

	get(name, callback) {
		callback(JSON.parse(localstorage.getItem(name)));
	},

	remove(name, callback) {
		callback(localstorage.removeItem(name));
	},

	addListener(callback) {
		return window.addEventListener('storage', callback);
	},

	removeListener(callback) {
		return window.removeEventListener('storage', callback);
	},

	clear(callback) {
		callback(localstorage.clear());
	}
}

const chromeStorage = {
	set(name, data, callback) {
		var obj = {};
		obj[name] = data;
		localstorage.set(obj, callback);
	},

	get(name, callback) {
		localstorage.get(name, res => callback(res[name]));
	},

	remove(name, callback) {
		localstorage.remove(name, callback);
	},

	addListener(callback) {
		chrome.storage.onChanged.addListener(callback);
	},

	removeListener(callback) {
		chrome.storage.onChanged.removeListener(callback);
	},

	clear(callback) {
		localstorage.clear(callback);
	}
}

export default isChrome ? chromeStorage : browserStorage;
