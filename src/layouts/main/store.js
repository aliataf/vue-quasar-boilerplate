function getState() {
	return {
		drawerStateStore: false,
	};
}

export default {
	namespaced: true,
	state: getState,
	getters: {
		drawerStateStore(state) {
			return state.drawerStateStore;
		},
	},
	mutations: {
		setDrawerStateStore(state, value) {
			state.drawerStateStore = value;
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {},
};
