package rdata

import (
	"errors"
	"sync"
	"time"
)

type ICode struct {
	Token  string
	Expiry time.Time
}

type Rdata struct {
	codeGroup []ICode
}

var (
	instance *Rdata
	once     sync.Once
)

func GetInstance() *Rdata {
	once.Do(func() {
		instance = &Rdata{
			codeGroup: make([]ICode, 0),
		}
	})
	return instance
}

func (r *Rdata) GetCodeGroup() []ICode {
	return r.codeGroup
}

func (r *Rdata) AddCode(code ICode) {
	r.codeGroup = append(r.codeGroup, code)
}

func (r *Rdata) GetCode(token string) (*ICode, error) {
	codeCache := make([]ICode, 0)
	var c ICode
	for _, code := range r.codeGroup {
		// 检测是否过期
		if code.Expiry.Before(time.Now()) {
			codeCache = append(codeCache, code)
		}
		if code.Token == token {
			c = code
		}
	}
	r.codeGroup = codeCache
	if c.Token == token {
		return &c, nil
	}
	return nil, errors.New("code not found")
}

func (r *Rdata) RemoveCode(token string) {
	for i, code := range r.codeGroup {
		if code.Token == token {
			r.codeGroup = append(r.codeGroup[:i], r.codeGroup[i+1:]...)
			break
		}
	}
}

func (r *Rdata) ClearCode() {
	r.codeGroup = make([]ICode, 0)
}
