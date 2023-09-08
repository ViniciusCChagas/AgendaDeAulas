import axios from 'axios';
console.log(process.env.REACT_APP_API_URL);
export const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		if (error.response?.status === 401) {
			window.location.href = `/login`;
		}
		return Promise.reject(error);
	}
);
