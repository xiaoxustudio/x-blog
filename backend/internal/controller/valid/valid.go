package valid

import (
	v1 "backend/api/v1/valid"
	"backend/utility/rdata"
	"backend/utility/rtool"
	"time"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
	"github.com/gogf/gf/v2/util/grand"
)

type Valid struct {
}

func New() *Valid {
	return &Valid{}
}

func (v *Valid) Generate(req *ghttp.Request) {
	ctx := req.Context()

	var data v1.GenerateCodeReq
	if err := req.Parse(&data); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "请求体格式错误", err.Error()))
		return
	}
	if err := g.Validator().Data(&data).Run(ctx); err != nil {
		req.Response.WriteJsonExit(rtool.ToReturn(-1, "参数校验失败", err.Maps()))
		return
	}
	code := rdata.ICode{Token: grand.Letters(4), Expiry: time.Now().Add(time.Minute * 5)}
	rdata.GetInstance().AddCode(code)
	img := rtool.ImgText(180, 70, code.Token)
	req.Response.WriteJsonExit(rtool.ToReturn(0, "成功", img))
}
