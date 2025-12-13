// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package do

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gtime"
)

// Comments is the golang structure of table comments for DAO operations like Where/Data.
type Comments struct {
	g.Meta    `orm:"table:comments, do:true"`
	Id        any         // 评论ID
	PostId    any         // 关联的文章ID
	UserId    any         // 评论用户ID
	Content   any         // 评论内容
	ParentId  any         // 父评论ID, 0为顶级评论
	CreatedAt *gtime.Time // 创建时间
	UpdatedAt *gtime.Time // 更新时间
}
