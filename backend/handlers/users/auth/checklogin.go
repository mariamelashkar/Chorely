package auth

import (
	"errors"
	"sync"
)

var (
	users   = make(map[string]string)
	userIDs = make(map[string]int) 
	nextID  = 1
	mu      sync.Mutex
)
func CheckUserCredentials(username, password string) (int, bool, error) {
	mu.Lock()
	defer mu.Unlock()

	hashedPassword := HashPassword(password)
	storedPassword, exists := users[username]
	if !exists || storedPassword != hashedPassword {
		return 0, false, errors.New("invalid username or password")
	}

	userID, exists := userIDs[username]
	if !exists {
		return 0, false, errors.New("user ID not found")
	}

	return userID, true, nil
}