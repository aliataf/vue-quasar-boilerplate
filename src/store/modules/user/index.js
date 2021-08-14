import UserService from './service';

export default {
	namespaced: true,
	state() {
		return {
			loading: false,
			user: null,
		};
	},
	getters: {
		loading(state) {
			return state.loading;
		},
		user(state) {
			return state.user;
		},
		userPermissions(state) {
			return state.userPermissions;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setUser(state, value) {
			state.user = value;
		},
	},
	actions: {
		async fetchUser({ commit, state }, { forceFetch = false } = {}) {
			if (!forceFetch && state.user !== null) {
				return state.user;
			} else {
				commit('setLoading', true);
				try {
					let data = await UserService.getUser();
					commit('setUser', data);
				} catch (err) {
					console.log(err);
				} finally {
					commit('setLoading', false);
				}
			}
		},
	},
};
