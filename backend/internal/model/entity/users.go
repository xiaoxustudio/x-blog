// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package entity

import (
	"github.com/gogf/gf/v2/os/gtime"
)

// Users is the golang structure for table users.
type Users struct {
	Id        int         `json:"id"         orm:"id"        ` //
	Username  string      `json:"username"   orm:"username"  ` //
	Email     string      `json:"email"      orm:"email"     ` //
	Password  string      `json:"password"   orm:"password"  ` //
	Nickname  string      `json:"nickname"   orm:"nickname"  ` //
	Avatar    string      `json:"avatar"     orm:"avatar"    ` //
	CreatedAt *gtime.Time `json:"created_at" orm:"createdAt" ` //
}
