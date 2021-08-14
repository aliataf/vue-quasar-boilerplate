import { axiosInstance as api } from '@/boot/axios';
import * as ep from './endpoints';

export default class Service {
	static exampleRequest(qp = {}) {
		return api.get(ep.EXAMPLE_ENDPOINT, qp).then((res) => res.data);
	}
}
