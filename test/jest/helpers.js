import { mount, createLocalVue } from '@vue/test-utils';
import { mountQuasar } from '@quasar/quasar-app-extension-testing-unit-jest';
import * as All from 'quasar';
const { Quasar } = All;

const components = Object.keys(All).reduce((object, key) => {
	const val = All[key];
	if (val && val.component && val.component.name != null) {
		object[key] = val;
	}
	return object;
}, {});

export const factory = (component, options = {}) => {
	const localVue = createLocalVue();
	localVue.use(Quasar, { components });

	return mountQuasar(component, {
		// mount: { type: 'full' } <= uncomment this line to use `mount`; `shallowMount` is used by default as it will stub all **registered** components found into the template
		quasar: { components, ...options },
	});
};
