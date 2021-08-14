class AuthHelper {
	setAccessToken(token) {
		localStorage.setItem('accessToken', token);
	}

	getAccessToken() {
		let token = localStorage.getItem('accessToken');

		return token;
	}

	setRefreshToken(token) {
		localStorage.setItem('refreshToken', token);
	}

	getRefreshToken() {
		let token = localStorage.getItem('refreshToken');

		return token;
	}

	reset() {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	}
}

const authHelper = new AuthHelper();

export default authHelper;
