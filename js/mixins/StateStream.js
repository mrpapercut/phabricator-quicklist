
export default {

	componentWillMount() {
		if (
				process.env.NODE_ENV != "production" && (
				typeof this.stateStream != 'function' && (
					typeof this.persistentStateStream != 'function' ||
					typeof this.setPersistentState != 'function'
				))
		) {
			console.warn("The stateStream or persistentStateStream method was not defined");
		}
		this.__unsubscribe = this.stateStream ?
			this.stateStream().onValue(x => this.setState(x)) :
			this.persistentStateStream().onValue(x => this.setPersistentState(x));
	},

	componentWillUnmount() {
		this.__unsubscribe();
	}

};
