package auth

import (
	"errors"
	"log"
)
func CheckUserCredentials(username, password string) (int, bool, error) {
	Mu.Lock()
	defer Mu.Unlock()

	user, exists := Users[username]
	if !exists {
		log.Printf("login attempt failed for user: %s. Reason: user does not exist\n", username)
		return 0, false, errors.New("invalid username or password")
	}

	log.Printf("Login attempt for user: %s\n", username)
	log.Printf("Entered Password: %s\n", password)
	log.Printf("Stored Password Hash: %s\n", user.Password)

	err :=CheckPasswordHash(password, user.Password)
	if err != nil {
		log.Printf("Login attempt failed for user: %s. Reason: password mismatch\n", username)
		return 0, false, errors.New("invalid username or password")
	}

	userID, exists := UserIDs[username]
	if !exists {
		return 0, false, errors.New("user ID not found")
	}

	return userID, true, nil
}