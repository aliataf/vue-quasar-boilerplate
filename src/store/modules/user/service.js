import { axiosInstance as api } from '@/boot/axios';
import * as ep from './endpoints';

class Service {
	static getUser() {
		return api.get(ep.USER).then((res) => {
			return res.data;
		});
	}
}

export default Service;
