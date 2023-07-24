package helper

import (
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v4"
	"github.com/rifki321/warungku/app"
)

func ReadJwt(r *http.Request) (string, error) {
	jwtCookie := r.Header.Get("Cookie")
	jwtSplit := strings.Split(jwtCookie, "=")
	jwtString := jwtSplit[1]
	if jwtString == "" {
		return "", nil
	}
	token, err := app.VerifyToken(strings.TrimPrefix(jwtString, "Bearer "))
	if err != nil {
		return "", err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", err

	}
	username := claims["username"].(string)
	return username, nil
}
