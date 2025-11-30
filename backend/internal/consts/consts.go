package consts

import "github.com/golang-jwt/jwt/v5"

type ClaimsStruct struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	jwt.RegisteredClaims
}
