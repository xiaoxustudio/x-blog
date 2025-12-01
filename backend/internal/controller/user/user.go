package user

import (
	v1 "backend/api/v1/user"
	"backend/internal/consts"
	"backend/internal/dao"
	"backend/internal/model/entity"
	"backend/utility/rtool"
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

	var data v1.LoginReq
	if err := req.Parse(&data); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "请求体格式错误", err.Error()))
		return
	}
	if err := g.Validator().Data(&data).Run(ctx); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "参数校验失败", err.Maps()))
		return
	}
	username := data.Username
	password := data.Password
	password = gmd5.MustEncryptString(password)

	md := dao.Users.Ctx(req.Context())
	var user entity.Users
	err := md.Where("username = ? AND password = ?", username, password).With(entity.Users{}).Scan(&user)
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "用户不存在或密码错误", err.Error()))
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
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "token生成错误", err.Error()))
	}
	req.Response.WriteJsonExit(rtool.ToReturn(0, "登录成功", tokenString))
}

func (u *User) Register(req *ghttp.Request) {
	ctx := req.Context()

	var data v1.RegisterReq
	if err := req.Parse(&data); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "请求体格式错误", err.Error()))
		return
	}
	if err := g.Validator().Data(&data).Run(ctx); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "参数校验失败", err.Maps()))
		return
	}

	username := data.Username
	email := data.Email
	password := data.Password
	md := dao.Users.Ctx(req.Context())

	var user []entity.Users
	err := md.Clone().Where("username = ? OR email = ?", username, email).With(entity.Users{}).Scan(&user)
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "数据库查询错误", err.Error()))
	}
	if len(user) > 0 {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "用户已存在", username))
	}

	md.Clone().Insert(entity.Users{
		Username: username,
		Email:    email,
		Password: gmd5.MustEncryptString(password),
	})

	req.Response.WriteJsonExit(rtool.ToReturn(0, "注册成功", nil))
}

func (u *User) Info(req *ghttp.Request) {

	info := req.Context().Value("userinfo").(map[string]interface{})
	username := info["username"].(string)

	md := dao.Users.Ctx(req.Context())
	var user entity.Users
	err := md.Where("username = ?", username).With(entity.Users{}).Scan(&user)
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "用户不存在", err.Error()))
	}
	if user.Id == 0 {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "用户不存在", nil))
	}

	userinfo := g.Map{
		"id":        user.Id,
		"username":  user.Username,
		"email":     user.Email,
		"nickname":  user.Nickname,
		"avatar":    user.Avatar,
		"createdAt": user.CreatedAt,
	}
	req.Response.WriteJsonExit(rtool.ToReturn(0, "获取用户信息成功", userinfo))
}
