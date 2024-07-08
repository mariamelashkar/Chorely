package redis

import (
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	
)

func ParseJWT(tokenStr string) (jwt.MapClaims, error) {
	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return JwtSecret, nil
	})

	if err != nil {
		fmt.Println("Error parsing token:", err)
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
