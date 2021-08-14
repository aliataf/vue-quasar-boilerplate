import axios from 'axios';
import { store } from '@/store';
import { addNotificationInterceptor } from '@/utils/axios-helpers';
import authHelper from '@/utils/auth-helper';
const axiosInstance = axios.create({
	baseURL: process.env.BASE_URL + '/api/v1',
	headers: {
		Authorization: 'Bearer ' + authHelper.getAccessToken(),
	},
});

addNotificationInterceptor(axiosInstance);

export default ({ Vue }) => {
	Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance };
