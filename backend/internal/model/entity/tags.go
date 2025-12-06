// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package entity

// Tags is the golang structure for table tags.
type Tags struct {
	Id          uint   `json:"id"          orm:"id"          ` // 主键ID
	Name        string `json:"name"        orm:"name"        ` // 分类名称
	Description string `json:"description" orm:"description" ` // 分类描述
	Color       string `json:"color"       orm:"color"       ` // 颜色标识，例如Tailwind CSS类名
}
