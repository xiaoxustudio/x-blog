package v1

import "github.com/gogf/gf/v2/frame/g"

type (
	GenerateCodeReq struct {
		g.Meta `path:"/gen" method:"post" summary:"生成验证码" tags:"生成验证码"`
	}
	GenerateCodeRes struct{}
)
