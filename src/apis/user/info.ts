import { Get } from "@/axios";

function GetInfo() {
	return Get("/api/user/info");
}

export default GetInfo;
