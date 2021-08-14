import ExampleModuleRoutes from '@/modules/example-module/routes';

const routes = [
	{
		path: '/',
		component: () => import(/* webpackChunkName: "MainLayout" */ '@/layouts/main'),
		children: [ExampleModuleRoutes],
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('@/layouts/404'),
	},
];

export default routes;
