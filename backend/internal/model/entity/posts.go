// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package entity

import (
	"github.com/gogf/gf/v2/os/gtime"
)

// Posts is the golang structure for table posts.
type Posts struct {
	Id         uint        `json:"id"          orm:"id"          ` //
	Title      string      `json:"title"       orm:"title"       ` // 标题
	Excerpt    string      `json:"excerpt"     orm:"excerpt"     ` // 摘要
	Content    string      `json:"content"     orm:"content"     ` // markdown 内容
	Author     string      `json:"author"      orm:"author"      ` // 作者ID (外键)
	Date       *gtime.Time `json:"date"        orm:"date"        ` // 发布时间
	CoverImage string      `json:"cover_image" orm:"cover_image" ` // base64 图片文本
	Tags       string      `json:"tags"        orm:"tags"        ` // 标签 (JSON数组)
	Featured   int         `json:"featured"    orm:"featured"    ` // 是否为推荐文章
}
