package redis

import (
	"errors"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/golang-jwt/jwt/v4"
)

// validate_token.go
func ValidateToken(tokenStr string) (jwt.MapClaims, error) {
    fmt.Printf("Validating token: %s\n", tokenStr)

    claims, err := ParseJWT(tokenStr)
    if err != nil {
        fmt.Printf("Error parsing JWT: %v\n", err)
        return nil, err
    }

    userID, ok := claims["user_id"].(string)
    if !ok {
        return nil, errors.New("user ID not found in token claims")
    }

    storedToken, err := Client.Get(Ctx, "token:"+userID).Result()
    if err == redis.Nil || storedToken != tokenStr {
        fmt.Println("Invalid token detected")
        return nil, errors.New("invalid token")
    } else if err != nil {
        return nil, err
    }

    fmt.Println("Token validated successfully")
    return claims, nil
}
