package redis

import (
	"errors"
	"fmt"
	"time"
)

func StoreToken(token string) error {
	claims, err := ParseJWT(token)
	if err != nil {
		fmt.Println("Error parsing JWT:", err)
		return err
	}

	userID, ok := claims["user_id"].(string)
	if !ok {
		fmt.Println("Error: userID not found in token claims")
		return errors.New("invalid token: userID not found")
	}

	// Debug statements
	fmt.Println("Storing token for userID:", userID)
	fmt.Println("Token:", token)

	if Client == nil {
		fmt.Println("Redis client is not initialized")
		return errors.New("redis client is not initialized")
	}

	err = Client.SetEX(Ctx, "token:"+userID, token, 30*time.Minute).Err()
	if err != nil {
		fmt.Println("Error storing token in Redis:", err)
	}
	fmt.Println("Token stored successfully")
	return err
}