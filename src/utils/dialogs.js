import { Dialog } from 'quasar';
import ConfirmDelete from '../components/dialogs/confirm-delete.vue';

export function deleteDialog() {
	return Dialog.create({
		component: ConfirmDelete,
	});
}
