package auth

import (
	"encoding/json"
	"net/http"
	"task/models"
	"errors"
  "fmt"

)

func AddUser(username, email, password, role string) (int, error) {
	Mu.Lock()
	defer Mu.Unlock()

	if _, exists := Users[username]; exists {
		return 0, errors.New("username already exists")
	}

	hashedPassword, err :=HashPassword(password)
	if err != nil {
		return 0, errors.New("error hashing password")
	}

	fmt.Printf("Registering user: %s\n", username)
	fmt.Printf("Hashed Password: %s\n", hashedPassword)

	Users[username] = models.User{
		ID:       UserIDCounter,
		Username: username,
		Email:    email,
		Password: hashedPassword,
		Role:     role,
	}
	UserIDs[username] = UserIDCounter
	UserIDCounter++

	fmt.Printf("User %s added successfully with ID: %d\n", username, UserIDCounter-1)
	return UserIDCounter - 1, nil
}

func AddUserHandler(w http.ResponseWriter, r *http.Request) {
	var registerRequest models.RegisterRequest

	err := json.NewDecoder(r.Body).Decode(&registerRequest)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	userID, err := AddUser(registerRequest.Username, registerRequest.Email, registerRequest.Password, registerRequest.Role)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]int{"user_id": userID})
}