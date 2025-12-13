// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package entity

import (
	"github.com/gogf/gf/v2/os/gtime"
)

// Comments is the golang structure for table comments.
type Comments struct {
	Id        int         `json:"id"        orm:"id"         ` // 评论ID
	PostId    uint        `json:"postId"    orm:"post_id"    ` // 关联的文章ID
	UserId    string      `json:"userId"    orm:"user_id"    ` // 评论用户ID
	Content   string      `json:"content"   orm:"content"    ` // 评论内容
	ParentId  int         `json:"parentId"  orm:"parent_id"  ` // 父评论ID, 0为顶级评论
	CreatedAt *gtime.Time `json:"createdAt" orm:"created_at" ` // 创建时间
	UpdatedAt *gtime.Time `json:"updatedAt" orm:"updated_at" ` // 更新时间
}
