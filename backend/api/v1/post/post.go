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
	PostAddCommentReq struct {
		g.Meta   `path:"/post/add_comment" method:"POST" summary:"添加评论"`
		PostId   uint   `json:"post_id" v:"required#文章ID不能为空"`
		Content  string `json:"content" v:"required#评论内容不能为空"`
		ParentId int    `json:"parent_id" v:"required#父级评论ID不能为空"`
	}

	PostGetPostCommentReq struct {
		g.Meta   `path:"/post/get_post_comments" method:"POST" summary:"获取文章评论"`
		PostId   uint `json:"post_id" v:"required#文章ID不能为空"`
		PageNum  int  `json:"page_num" v:"required|min:0#页码不能为空|页码必须大于等于0"`
		PageSize int  `json:"page_size" v:"required|min:0#每页数量不能为空|每页数量必须大于等于0"`
		ParentId int  `json:"parent_id" v:"required#父级评论ID不能为空"`
	}
)
