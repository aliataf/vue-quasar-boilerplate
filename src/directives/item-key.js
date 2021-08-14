import Vue from 'vue';
import { store } from '@/store';

const validatePermissions = (el, bind, node) => {
	el.style.visibility = 'hidden';
	let key = bind.value;

	let hasAccess = store.getters['User/checkAccess'](key);

	if (hasAccess) {
		el.style.visibility = 'visible';
	} else {
		setTimeout(() => el.remove());
	}
};

export default () => {
	Vue.directive('item-key', {
		async bind(el, bind, node) {
			if (bind.value) {
				validatePermissions(el, bind, node);
			}
		},
		async update(el, bind, node) {
			if (bind.value) {
				validatePermissions(el, bind, node);
			}
		},
		unbind(el) {},
	});
};
