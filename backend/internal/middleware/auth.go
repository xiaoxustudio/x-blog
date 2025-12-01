package middleware

import (
	"backend/internal/consts"
	"backend/utility/rtool"
	"net/http"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
	"github.com/gogf/gf/v2/util/gconv"
	jwt "github.com/golang-jwt/jwt/v5"
)

// Auth JWT 认证中间件
func Auth(r *ghttp.Request) {
	token := r.Header.Get("Authorization")
	if token == "" {
		r.Response.Status = http.StatusUnauthorized
		r.Response.WriteJsonExit(rtool.ToReturn(-1, "认证信息无效", http.StatusUnauthorized))
	}

	data, err := jwt.ParseWithClaims(token, &consts.ClaimsStruct{}, func(token *jwt.Token) (any, error) {
		jwtSecret, _ := g.Cfg().Get(r.GetCtx(), "jwt.secret")
		return jwtSecret.Bytes(), nil
	})

	if err != nil {
		r.Response.Status = http.StatusUnauthorized
		r.Response.WriteJsonExit(rtool.ToReturn(-1, "认证信息无效", err.Error()))
	}

	// 将用户信息存入 Context，后续接口可以获取
	r.SetCtxVar("userinfo", gconv.Map(data.Claims))
	r.Middleware.Next()
}
