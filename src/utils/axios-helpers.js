import { Notify } from 'quasar';
import authHelper from './auth-helper';
import { router } from '@/router';
import { store } from '@/store';

export function addNotificationInterceptor(axiosInstance) {
	axiosInstance.interceptors.response.use(
		(response) => {
			handleResponseStatus(response);
			return Promise.resolve(response);
		},
		(error) => {
			if (error.response) {
				handleResponseStatus(error.response);
			}
			return Promise.reject(error);
		},
	);

	function handleResponseStatus(response) {
		if (response.config.hideNotification) return;
		let text = response.data.message || '',
			type;
		if (
			text === '' ||
			response.status < 200 ||
			(response.status >= 300 && response.status < 400)
		) {
			return;
		}
		if (response.status >= 200 && response.status < 300) {
			type = 'positive';
		} else if (response.status >= 400) {
			type = 'negative';
		}
		showNotification(text, type);
	}
}

function showNotification(text, type) {
	Notify.create({
		message: `${text}`,
		type: type,
	});
}

export function addAuthorizationInterceptor(axiosInstance) {
	axiosInstance.interceptors.response.use(
		(response) => {
			return Promise.resolve(response);
		},
		(error) => {
			if (error.response && error.response.status === 401) {
				let errorMessage = String(error.response.data.error);

				if (errorMessage.toLowerCase().includes('password is expired')) {
					showNotification(errorMessage, 'negative');
					store.dispatch('User/setExpiredPasswordFlag', true);
					router.push('/reset-password');
				} else {
					authHelper.reset();
					router.go();
				}
			}
			return Promise.reject(error);
		},
	);
}
