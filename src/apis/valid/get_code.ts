import { Post } from "@/axios";

function GetCode() {
	return Post("/api/valid/gen");
}

export default GetCode;
