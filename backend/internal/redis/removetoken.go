package redis

import (
	"errors"
	"fmt"
	
)

func RemoveToken(tokenStr string) error {
	_, err := ValidateToken(tokenStr)
	if err != nil {
		return err
	}
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

	return Client.Del(Ctx, "token:"+userID).Err()
}