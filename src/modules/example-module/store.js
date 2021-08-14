import ExamplePage from './pages/example-page/store';

function getState() {
	return {
		loading: false,
	};
}

export default {
	namespaced: true,
	modules: {
		ExamplePage,
	},
	state: getState,
	getters: {
		loading(state) {
			return state.loading;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {},
};
