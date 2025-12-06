package common

import (
	"backend/internal/dao"
	"backend/internal/model/entity"
	"backend/utility/rtool"

	"github.com/gogf/gf/v2/net/ghttp"
)

type Common struct {
}

func New() *Common {
	return &Common{}
}

func (u *Common) GetTags(req *ghttp.Request) {
	ctx := req.Context()
	var data []entity.Tags
	err := dao.Tags.Ctx(ctx).With(entity.Tags{}).Scan(&data)
	if err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "获取标签失败", err.Error()))
	}

	req.Response.WriteJsonExit(rtool.ToReturn(0, "ok", data))
}
