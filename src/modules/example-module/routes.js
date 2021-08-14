import ModuleLayout from './module-layout.vue';

export default {
	path: '/',
	component: ModuleLayout,
	children: [
		{
			path: 'example-page',
			component: () => import('./pages/example-page'),
		},
	],
};
