package user

import (
	"backend/internal/consts"
	"backend/internal/dao"
	"backend/internal/model/entity"
	"backend/utility/rtool"
	"fmt"
	"time"

	jwt "github.com/golang-jwt/jwt/v5"

	"github.com/gogf/gf/v2/crypto/gmd5"
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
)

type User struct {
}

func New() *User {
	return &User{}
}

func (u *User) Login(req *ghttp.Request) {
	ctx := req.Context()
	body := g.RequestFromCtx(ctx)
	username := body.Get("username").String()
	password := body.Get("password").String()
	password = gmd5.MustEncryptString(password)
	if username == "" || password == "" {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "参数错误", nil))
	}
	md := dao.Users.Ctx(req.Context())
	var user entity.Users
	err := md.Where("username = ? AND password = ?", username, password).With(entity.Users{}).Scan(&user)
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, fmt.Sprintf("数据库查询错误:%v", err.Error()), nil))
	}
	if user.Id == 0 {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "用户不存在或密码错误", nil))
	}

	jwtSecret, _ := g.Cfg().Get(ctx, "jwt.secret")

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, consts.ClaimsStruct{
		Username: user.Username,
		Email:    user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			// 过期时间 24小时
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			// 签发时间
			IssuedAt: jwt.NewNumericDate(time.Now()),
			// 生效时间
			NotBefore: jwt.NewNumericDate(time.Now()),
			// 签名的签发者
			Issuer: "xblog",
		},
	})

	tokenString, err := token.SignedString(jwtSecret.Bytes())
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, fmt.Sprintf("token生成错误:%v", err.Error()), nil))
	}
	req.Response.WriteJsonExit(rtool.ToReturn(0, "登录成功", tokenString))
}

func (u *User) Register(req *ghttp.Request) {
	ctx := req.Context()
	body := g.RequestFromCtx(ctx)
	username := body.Get("username").String()
	email := body.Get("email").String()
	password := body.Get("password").String()
	if username == "" || email == "" || password == "" {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "参数错误", nil))
	}
	md := dao.Users.Ctx(req.Context())

	var user []entity.Users
	err := md.Clone().Where("username = ? OR email = ?", username, email).With(entity.Users{}).Scan(&user)
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, fmt.Sprintf("数据库查询错误:%v", err.Error()), nil))
	}
	if len(user) > 0 {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, fmt.Sprintf("用户已存在:%s", username), nil))
	}

	md.Clone().Insert(entity.Users{
		Username: username,
		Email:    email,
		Password: gmd5.MustEncryptString(password),
	})

	req.Response.WriteJsonExit(rtool.ToReturn(0, "注册成功", nil))
}
