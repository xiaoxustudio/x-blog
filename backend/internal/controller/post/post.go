package post

import (
	v1 "backend/api/v1/post"
	"backend/internal/dao"
	"backend/internal/model/entity"
	"backend/utility/rtool"
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
