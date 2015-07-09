import events from 'events';
import assign from 'object-assign';

const AppStore = assign({}, events.EventEmitter.prototype, {
	setUsers(users) {
		this.users = users;
	},

	getUsers() {
		return this.users;
	},

	emitChange() {
		this.emit('change');
	},

	addChangeListener(callback) {
		this.on('change', callback);
	},

	removeChangeListener(callback) {
		this.removeListener('change', callback);
	}
});

AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {
		case 'SET_USERS':
			AppStore.setUsers(action.data);
			break;

		case 'GET_USERS':
			AppStore.getUsers();
			break;

	}

	AppStore.emitChange();
	return true;
});

export default AppStore;
