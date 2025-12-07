import { Get } from "@/axios";

function GetTags() {
	return Get("/api/common/tags");
}

export default GetTags;
