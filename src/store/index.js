import Vue from 'vue';
import Vuex from 'vuex';

import MainLayout from '@/layouts/main/store';
import ExampleModule from '@/modules/example-module/store';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the store instance.
 */

/**
 * @returns {store}
 */
export default function(/* { ssrContext } */) {
	if (store == null) {
		store = new Vuex.Store({
			modules: {
				MainLayout,
				ExampleModule,
			},

			// enable strict mode (adds overhead!)
			// for dev mode only
			strict: process.env.DEBUGGING,
		});
	}
	return store;
}

export var store;
