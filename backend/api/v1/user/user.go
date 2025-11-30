package v1

import "github.com/gogf/gf/v2/frame/g"

type (
	RegisterReq struct {
		g.Meta   `path:"/user/register" method:"POST" summary:"用户注册"`
		Username string `json:"username" v:"required|length:3,50#用户名不能为空|用户名长度为3到50位"`
		Password string `json:"password" v:"required|length:6,30#密码不能为空|密码长度为6到30位"`
	}
	RegisterRes struct{}

	LoginReq struct {
		g.Meta   `path:"/user/login" method:"POST" summary:"用户登录"`
		Username string `json:"username" v:"required#用户名不能为空"`
		Password string `json:"password" v:"required#密码不能为空"`
	}
	LoginRes struct {
		Token string `json:"token"`
	}

	InfoReq struct {
		g.Meta `path:"/user/info" method:"GET" summary:"获取用户信息"`
	}
	InfoRes struct {
		Username string `json:"username"`
	}
)
