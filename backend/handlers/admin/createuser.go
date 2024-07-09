package admin

import (
	"encoding/json"
	"net/http"
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
func CreateUser(w http.ResponseWriter, r *http.Request) {
    var user models.User
    err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }

    err =AddUser(user.Username, user.Email, user.Password, user.Role)
    if err != nil {
        http.Error(w, "Could not create user", http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}