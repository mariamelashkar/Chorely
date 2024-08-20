package redis

import (
	"errors"
	"fmt"
	
)
func RemoveToken(tokenStr string) error {
    // Validate the token first
    _, err := ValidateToken(tokenStr)
    if err != nil {
        return err
    }

    // Parse the token to extract userID
    claims, err := ParseJWT(tokenStr)
    if err != nil {
        fmt.Println("Error parsing JWT:", err)
        return err
    }

    userID, ok := claims["user_id"].(string)
    if !ok {
        fmt.Println("Error: userID not found in token claims")
        return errors.New("invalid token: userID not found")
    }

    // Construct the Redis key
    redisKey := "token:" + userID

    // Check if the token exists in Redis
    storedToken, err := Client.Get(Ctx, redisKey).Result()
    if err != nil {
        fmt.Println("Error fetching token from Redis:", err)
        return err
    }

    // Verify the token matches the one stored in Redis
    if storedToken != tokenStr {
        return errors.New("token mismatch: the provided token does not match the stored token")
    }

    // Delete the token from Redis
    return Client.Del(Ctx, redisKey).Err()
}
