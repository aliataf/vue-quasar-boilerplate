import Vue from 'vue';
import VueRouter from 'vue-router';
import authHelper from '@/utils/auth-helper';
import { store } from '../store';
import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the router instance.
 */

/**
 * @returns {VueRouter}
 */
export default function(/* { store, ssrContext } */) {
	if (router == null) {
		router = new VueRouter({
			scrollBehavior: () => ({ x: 0, y: 0 }),
			routes,

			// Leave these as they are and change in quasar.conf.js instead!
			// quasar.conf.js -> build -> vueRouterMode
			// quasar.conf.js -> build -> publicPath
			mode: process.env.VUE_ROUTER_MODE,
			base: process.env.VUE_ROUTER_BASE,
		});
	}

	/* const whiteList = ['/login'];

	router.beforeEach((to, from, next) => {
		store
			.dispatch('Auth/getAccessToken')
			.then((_) => {
				if (whiteList.includes(to.path)) {
					// if is logged in, redirect to the home page
					next('/');
				} else {
					next();
				}
			})
			.catch((_) => {
				if (whiteList.includes(to.path)) {
					next();
				} else {
					authHelper.reset();
					next('/login');
				}
			});
	}); */

	return router;
}

export var router;
