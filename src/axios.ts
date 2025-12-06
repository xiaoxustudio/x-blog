import axios, { type AxiosRequestConfig } from "axios";
import type { RepsonseData } from "./types";
import useUser from "./store/user";
import { toast } from "sonner";

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
	return ApiInstance.get<D, T>(url, config).catch((error) => {
		const {
			response: { data },
			status
		} = error;
		if (status === 401) {
			useUser.getState().setToken("");
			toast.error(data.msg);
		}
		return error;
	});
}

export default ApiInstance;
