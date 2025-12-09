package cmd

import (
	"backend/internal/controller/common"
	"backend/internal/controller/post"
	"backend/internal/controller/user"
	"backend/internal/middleware"
	"context"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
	"github.com/gogf/gf/v2/os/gcmd"
)

// 允许跨域请求中间件
func Middleware(r *ghttp.Request) {
	r.Response.CORSDefault()
	r.Middleware.Next()
}

type Response struct {
	Message string      `json:"message" dc:"消息提示"`
	Data    interface{} `json:"data"    dc:"执行结果"`
	Code    int         `json:"code"    dc:"状态码"`
}

var (
	Main = gcmd.Command{
		Name:  "main",
		Usage: "main",
		Brief: "start http server",
		Func: func(ctx context.Context, parser *gcmd.Parser) (err error) {
			s := g.Server()
			// 分组路由
			s.Group("/", func(group *ghttp.RouterGroup) {
				group.Middleware(ghttp.MiddlewareHandlerResponse)
				group.Middleware(Middleware)

				// 不需要认证的路由
				group.Group("/user", func(group *ghttp.RouterGroup) {
					controller := user.New()
					group.POST("/register", controller.Register)
					group.POST("/login", controller.Login)
				})

				group.Group("/common", func(group *ghttp.RouterGroup) {
					controller := common.New()
					group.GET("/tags", controller.GetTags)
					group.POST("/posts", controller.GetPosts)
				})

				// 需要认证的路由
				group.Group("/user", func(group *ghttp.RouterGroup) {
					group.Middleware(middleware.Auth)
					controller := user.New()
					group.GET("/info", controller.Info)
					group.POST("/edit", controller.EditInfo)
					group.POST("/publish", controller.PublishArticle)
					group.POST("/publish_posts", controller.GetPublishPosts)
				})
				group.Group("/post", func(group *ghttp.RouterGroup) {
					group.Middleware(middleware.Auth)
					controller := post.New()
					group.POST("/delete", controller.Delete)
					group.POST("/duplicate", controller.Duplicate)
				})
			})
			s.Run()
			return nil
		},
	}
)
