
export default {
	ctx() {
		return this.props.ctx;
	},
	disp(name) {
		return this.ctx().disp(name);
	}
};
