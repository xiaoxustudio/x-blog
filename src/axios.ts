import axios, { type AxiosRequestConfig } from "axios";
import type { RepsonseData } from "./types";
import useUser from "./store/useUser";

const ApiInstance = axios.create({
	timeout: 1000
});

ApiInstance.interceptors.request.use((respone) => {
	const { token } = useUser.getState();
	respone.headers["Authorization"] = token;
	return respone;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Post<T = RepsonseData, D = any>(
	url: string,
	data?: D,
	option?: AxiosRequestConfig
) {
	return ApiInstance.post<D, T>(url, data, option);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Get<T = RepsonseData, D = any>(
	url: string,
	config?: AxiosRequestConfig
) {
	return ApiInstance.get<D, T>(url, config);
}

export default ApiInstance;
