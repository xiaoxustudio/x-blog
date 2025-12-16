package v1

import "github.com/gogf/gf/v2/frame/g"

type (
	RegisterReq struct {
		g.Meta   `path:"/user/register" method:"POST" summary:"用户注册"`
		Username string `json:"username" v:"required|length:3,50#用户名不能为空|用户名长度为3到50位"`
		Password string `json:"password" v:"required|length:6,50#密码不能为空|密码长度为6到50位"`
		Email    string `json:"email" v:"required|email#邮箱不能为空|邮箱格式不正确"`
	}
	RegisterRes struct{}

	LoginReq struct {
		g.Meta   `path:"/user/login" method:"POST" summary:"用户登录"`
		Username string `json:"username" v:"required#用户名不能为空"`
		Password string `json:"password" v:"required#密码不能为空"`
		Code     string `json:"code" v:"required#验证码不能为空"`
	}
	LoginRes struct {
		Token string `json:"token"`
	}

	EditInfoReq struct {
		g.Meta   `path:"/user/editInfo" method:"POST" summary:"编辑用户信息"`
		Nickname string `json:"nickname" v:"required|length:3,20#昵称不能为空|昵称长度为3到20位"`
		Email    string `json:"email" v:"required|email#邮箱不能为空|邮箱格式不正确"`
		Avatar   string `json:"avatar"`
	}
	EditInfoRes struct {
	}

	PublishArticleReq struct {
		g.Meta  `path:"/user/publishArticle" method:"POST" summary:"发布文章"`
		Title   string `json:"title" v:"required|length:3,50#标题不能为空|标题长度为3到50位"`
		Content string `json:"content" v:"required|length:10,2000#内容不能为空|内容长度为10到2000位"`
		Excerpt string `json:"excerpt" v:"required|length:3,50#摘要不能为空|摘要长度为3到50位"`
		Author  string `json:"author" v:"required|length:3,20#作者不能为空|作者长度为3到20位"`
		// Date       string `json:"date" v:"required#日期不能为空"`
		CoverImage string `json:"coverImage"`
		Tags       string `json:"tags" v:"required|min-length:1#标签不能为空|至少需要一个标签"`
		Featured   bool   `json:"featured" v:"required#特性不能为空"`
	}
	PublishArticleRes struct {
	}
)
