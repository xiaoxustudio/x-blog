package post

import (
	v1 "backend/api/v1/post"
	"backend/internal/dao"
	"backend/internal/model/entity"
	"backend/utility/rtool"
	"fmt"
	"time"

	"github.com/gogf/gf/v2/container/garray"
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

	type CommentWithUser struct {
		*entity.Comments
		UserInfo g.Map             `json:"user_info"`
		Children []CommentWithUser `json:"children"`
	}

	var allComments []entity.Comments
	err := dao.Comments.Ctx(ctx).
		Where("post_id = ?", data.PostId).
		OrderAsc("created_at").
		Scan(&allComments)
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "查询评论失败", err.Error()))
		return
	}

	if len(allComments) == 0 {
		req.Response.WriteJsonExit(rtool.ToReturn(0, "获取文章评论成功", g.Map{
			"comments": []interface{}{},
			"total":    0,
		}))
		return
	}

	// 收集所有评论者的 user_id
	userIDs := garray.New()
	for _, comment := range allComments {
		userIDs.Append(comment.UserId)
	}

	// 一次性查询所有相关用户信息
	var users []entity.Users
	err = dao.Users.Ctx(ctx).
		Where("username IN (?)", userIDs.Unique().Slice()).
		FieldsEx("password").
		Scan(&users)
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "查询用户信息失败", err.Error()))
		return
	}

	userMap := make(map[string]g.Map)
	for _, user := range users {
		userMap[user.Username] = g.Map{
			"id":       user.Id,
			"username": user.Username,
			"avatar":   user.Avatar,
			"nickname": user.Nickname,
		}
	}

	commentMap := make(map[int]*CommentWithUser) // 存储评论节点，方便后续查找和分配children
	var topLevelComments []*CommentWithUser      // 存储顶级评论节点

	for _, comment := range allComments {
		cwu := &CommentWithUser{
			Comments: &comment,
			UserInfo: userMap[comment.UserId],
			Children: []CommentWithUser{},
		}
		commentMap[comment.Id] = cwu
	}

	// 遍历所有评论，分配 children 和 顶级评论
	for _, comment := range allComments {
		commentNode := commentMap[comment.Id]
		// 假设 parent_id = 0 是顶级评论
		if comment.ParentId == 0 {
			topLevelComments = append(topLevelComments, commentNode)
		} else {
			// 查找父节点，并将当前节点添加到父节点的 children 中
			if parentNode, ok := commentMap[comment.ParentId]; ok {
				parentNode.Children = append(parentNode.Children, *commentNode)
			}
			// 如果找不到父节点，则忽略该评论（应该不会发生）
		}
	}

	// 分页
	if data.PageNum < 0 {
		data.PageNum = 0
	}
	if data.PageSize <= 0 {
		data.PageSize = 5
	}

	totalTopLevel := len(topLevelComments)
	start := data.PageNum * data.PageSize
	end := start + data.PageSize

	if start >= totalTopLevel {
		req.Response.WriteJsonExit(rtool.ToReturn(0, "获取文章评论成功", g.Map{
			"comments": []CommentWithUser{},
			"total":    totalTopLevel,
		}))
		return
	}
	if end > totalTopLevel {
		end = totalTopLevel
	}

	pagedComments := topLevelComments[start:end]

	req.Response.WriteJsonExit(rtool.ToReturn(0, "获取文章评论成功", g.Map{
		"comments": pagedComments,
		"total":    totalTopLevel,
	}))
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
