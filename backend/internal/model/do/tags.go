// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package do

import (
	"github.com/gogf/gf/v2/frame/g"
)

// Tags is the golang structure of table tags for DAO operations like Where/Data.
type Tags struct {
	g.Meta      `orm:"table:tags, do:true"`
	Id          any // 主键ID
	Name        any // 分类名称
	Description any // 分类描述
	Color       any // 颜色标识，例如Tailwind CSS类名
}
