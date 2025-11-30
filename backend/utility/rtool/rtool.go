package rtool

import "github.com/gogf/gf/v2/frame/g"

func ToReturn(code int, msg string, data any) g.Map {
	return g.Map{
		"code": code,
		"data": data,
		"msg":  msg,
	}
}
