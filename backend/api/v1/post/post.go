package v1

import "github.com/gogf/gf/v2/frame/g"

type (
	PostDeleteReq struct {
		g.Meta `path:"/post/delete" method:"POST" summary:"删除文章"`
		ID     string `json:"id" v:"required#ID不能为空"`
	}
	PostDuplicateReq struct {
		g.Meta `path:"/post/duplicate" method:"POST" summary:"复制文章"`
		ID     string `json:"id" v:"required#ID不能为空"`
	}
	PostSearchReq struct {
		g.Meta `path:"/post/search" method:"POST" summary:"搜索文章"`
		Kw     string `json:"kw" v:"required#关键字不能为空"`
	}
)
