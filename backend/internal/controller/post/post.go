package post

import (
	v1 "backend/api/v1/post"
	"backend/internal/dao"
	"backend/internal/model/entity"
	"backend/utility/rtool"
	"fmt"
	"time"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
	"github.com/gogf/gf/v2/os/gtime"
)

type Post struct {
}

func New() *Post {
	return &Post{}
}

func (*Post) Delete(req *ghttp.Request) {
	ctx := req.Context()

	var data v1.PostDeleteReq
	if err := req.Parse(&data); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "请求体格式错误", err.Error()))
		return
	}
	if err := g.Validator().Data(&data).Run(ctx); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "参数校验失败", err.Maps()))
		return
	}

	md := dao.Posts.Ctx(req.Context())
	res, err := md.Where("id = ?", data.ID).Delete()
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "删除文章失败", err.Error()))
	}
	if r, err := res.RowsAffected(); r == 0 {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "文章不存在", err.Error()))
	}

	req.Response.WriteJsonExit(rtool.ToReturn(0, "删除文章成功", nil))
}

func (*Post) Duplicate(req *ghttp.Request) {
	ctx := req.Context()

	var data v1.PostDuplicateReq
	if err := req.Parse(&data); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "请求体格式错误", err.Error()))
		return
	}
	if err := g.Validator().Data(&data).Run(ctx); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "参数校验失败", err.Maps()))
		return
	}

	md := dao.Posts.Ctx(req.Context())
	var post entity.Posts
	err := md.Clone().Where("id = ?", data.ID).With(entity.Posts{}).Scan(&post)
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "文章不存在", err.Error()))
	}

	// 插入新文章
	res, err := md.Clone().Insert(entity.Posts{
		Title:      post.Title,
		Content:    post.Content,
		Excerpt:    post.Excerpt,
		Author:     post.Author,
		Date:       gtime.NewFromTime(time.Now()),
		CoverImage: post.CoverImage,
		Tags:       post.Tags,
		Featured:   post.Featured,
	})

	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "复制文章失败", err.Error()))
	}

	if r, err := res.RowsAffected(); r == 0 {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "文章不存在", err.Error()))
	}

	req.Response.WriteJsonExit(rtool.ToReturn(0, "复制文章成功", nil))
}

func (*Post) Search(req *ghttp.Request) {
	ctx := req.Context()

	var data v1.PostSearchReq
	if err := req.Parse(&data); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "请求体格式错误", err.Error()))
		return
	}
	if err := g.Validator().Data(&data).Run(ctx); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "参数校验失败", err.Maps()))
		return
	}

	md := dao.Posts.Ctx(req.Context())
	var post []entity.Posts
	err := md.Clone().WhereLike("title", fmt.Sprintf("%%%s%%", data.Kw)).With(entity.Posts{}).Scan(&post)
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "文章不存在", err.Error()))
	}
	if len(post) == 0 {
		req.Response.WriteJsonExit(rtool.ToReturn(0, "搜索文章成功", []interface{}{}))
	}

	req.Response.WriteJsonExit(rtool.ToReturn(0, "搜索文章成功", post))
}

func (*Post) GetComment(req *ghttp.Request) {
	ctx := req.Context()

	var data v1.PostGetPostCommentReq
	if err := req.Parse(&data); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "请求体格式错误", err.Error()))
		return
	}
	if err := g.Validator().Data(&data).Run(ctx); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "参数校验失败", err.Maps()))
		return
	}

	md := dao.Comments.Ctx(req.Context())

	type CommentWithUser struct {
		*entity.Comments
		UserInfo g.Map `json:"user_info"`
	}

	var comments []CommentWithUser

	// 默认页码为0，每页5条
	if data.PageNum < 0 {
		data.PageNum = 0
	}
	if data.PageSize < 0 {
		data.PageSize = 5
	}

	err := md.Clone().
		Where("post_id = ?", data.PostId).Limit(data.PageNum*data.PageSize, data.PageSize).With(CommentWithUser{}).Scan(&comments)
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "文章不存在", err.Error()))
	}
	if len(comments) == 0 {
		req.Response.WriteJsonExit(rtool.ToReturn(0, "获取文章评论成功", []interface{}{}))
	}
	for i := range comments {
		if res, err := dao.Users.Ctx(ctx).Where("username = ?", comments[i].UserId).FieldsEx("password").One(); err == nil {
			comments[i].UserInfo = res.Map()
		}
	}
	if val, err := md.Count(g.Map{"post_id": data.PostId}); err == nil {
		req.Response.WriteJsonExit(rtool.ToReturn(0, "获取文章评论成功", g.Map{
			"comments": comments,
			"total":    val,
		}))
	}
	req.Response.WriteJsonExit(rtool.ToReturn(-1, "获取文章评论失败", err.Error()))

}

func (*Post) AddComment(req *ghttp.Request) {
	ctx := req.Context()

	var data v1.PostAddCommentReq
	if err := req.Parse(&data); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "请求体格式错误", err.Error()))
		return
	}
	if err := g.Validator().Data(&data).Run(ctx); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "参数校验失败", err.Maps()))
		return
	}

	md := dao.Comments.Ctx(req.Context())
	info := req.Context().Value("userinfo").(map[string]any)
	username := info["username"].(string)

	if data.ParentId != 0 {
		if _, err := md.Clone().Where("id = ?", data.ParentId).One(); err != nil {
			req.Response.WriteJsonExit(rtool.ToReturn(-1, "父级评论不存在", err.Error()))
		}
	}

	res, err := md.Clone().Insert(entity.Comments{
		UserId:    username,
		ParentId:  data.ParentId,
		PostId:    data.PostId,
		Content:   data.Content,
		CreatedAt: gtime.Now(),
	})

	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "添加评论失败", err.Error()))
	}

	if r, err := res.RowsAffected(); r == 0 {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "添加评论失败", err.Error()))
	}

	req.Response.WriteJsonExit(rtool.ToReturn(0, "添加评论成功", nil))
}
