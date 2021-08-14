import ConfirmDelete from 'src/components/dialogs/confirm-delete';
import { factory } from '../../../helpers';
import { ClosePopup } from 'quasar';
import { shallowMount } from '@vue/test-utils';
import { mountQuasar } from '@quasar/quasar-app-extension-testing-unit-jest';

describe('ConfirmDelete component', () => {
	const wrapper = factory(ConfirmDelete, { directives: { ClosePopup } });

	it('mounts without errors', () => {
		expect(wrapper).toBeTruthy();
	});

	it('accesses the shallowMount', () => {
		expect(wrapper.vm.$el.textContent).toContain('Are you sure you want to delete this Record?');
	});

	it('emit "ok" event when "ok" button is pressed', async () => {
		const mockMethod = jest.spyOn(ConfirmDelete.methods, 'onOKClick');
		const localWrapper = mountQuasar(ConfirmDelete, { quasar: { directives: { ClosePopup } } });
		const button = localWrapper.find('[data-testid="ok-btn"]');
		button.trigger('click');
		await wrapper.vm.$nextTick();
		expect(mockMethod).toHaveBeenCalled();
		expect(localWrapper.emitted().ok).toBeTruthy();
	});
});
