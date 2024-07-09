package auth

import (
	"errors"

	"fmt"

)

func CheckUserCredentials(username, password string) (int, bool, error) {
	Mu.Lock()
	defer Mu.Unlock()

	user, exists := Users[username]
	if !exists {
		fmt.Printf("Login attempt failed for user: %s. Reason: user does not exist\n", username)
		return 0, false, errors.New("invalid username or password")
	}

	hashedPassword := HashPassword(password)
	fmt.Printf("Login attempt for user: %s\n", username)
	fmt.Printf("Entered Password Hash: %s\n", hashedPassword)
	fmt.Printf("Stored Password Hash: %s\n", user.Password)

	if user.Password != hashedPassword {
		fmt.Printf("Login attempt failed for user: %s. Reason: password mismatch\n", username)
		return 0, false, errors.New("invalid username or password")
	}

	userID, exists := UserIDs[username]
	if !exists {
		return 0, false, errors.New("user ID not found")
	}

	return userID, true, nil
}