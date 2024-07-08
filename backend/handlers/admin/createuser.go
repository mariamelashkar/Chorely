package admin

import (
	"task/models"
	"golang.org/x/crypto/bcrypt"

)
var Users = make(map[string]models.User)
var userIDCounter int

func AddUser(username, email, password, role string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	userIDCounter++
	Users[username] = models.User{
		ID:       userIDCounter,
		Username: username,
		Email:    email,
		Password: string(hashedPassword),
		Role:     role,
		Tasks:    []int{},
	}
	return nil
}