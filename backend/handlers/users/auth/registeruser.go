package auth

import (
	"errors"
)
func RegisterUser(username, password string) (int, error) {
	mu.Lock()
	defer mu.Unlock()

	if _, exists := users[username]; exists {
		return 0, errors.New("username already exists")
	}

	hashedPassword := HashPassword(password)
	users[username] = hashedPassword
	userID := nextID
	userIDs[username] = userID
	nextID++

	return userID, nil
}
