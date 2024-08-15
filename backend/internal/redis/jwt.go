package redis

import (

	"github.com/golang-jwt/jwt/v4"
	"time"
	"fmt"
	"task/config"
)


// jwt.go
func GenerateToken(userID, role string) (string, error) {
    claims := jwt.MapClaims{
        "user_id": userID,
        "role":    role,
        "exp":     time.Now().Add(time.Minute * 30).Unix(),
    }

    fmt.Printf("Claims being used to generate token: %v\n", claims)

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(config.JwtSecret)
    if err != nil {
        fmt.Printf("Error signing token: %v\n", err)
    } else {
        fmt.Printf("Generated token: %s\n", tokenString)
    }
    return tokenString, err
}
