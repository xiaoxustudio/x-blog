// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package do

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gtime"
)

// Posts is the golang structure of table posts for DAO operations like Where/Data.
type Posts struct {
	g.Meta     `orm:"table:posts, do:true"`
	Id         any         //
	Title      any         // 标题
	Excerpt    any         // 摘要
	Content    any         // markdown 内容
	Author     any         // 作者ID (外键)
	Date       *gtime.Time // 发布时间
	CoverImage any         // base64 图片文本
	Tags       any         // 标签 (JSON数组)
	Featured   any         // 是否为推荐文章
}
