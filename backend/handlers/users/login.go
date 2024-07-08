package auth

import (
	"encoding/json"
	"net/http"
    "task/models"
    "strconv"
    "task/handlers/users/auth"
    "task/internal/redis"
)

func Login(w http.ResponseWriter, r *http.Request) {
	var loginRequest models.LoginRequest
	err := json.NewDecoder(r.Body).Decode(&loginRequest)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	userID, valid, err :=auth.CheckUserCredentials(loginRequest.Username, loginRequest.Password)
	if err != nil || !valid {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// Generate token
	tokenString, err := redis.GenerateToken(strconv.Itoa(userID))
	if err != nil {
		http.Error(w, "Could not create token", http.StatusInternalServerError)
		return
	}

	// Store token in Redis
	err = redis.StoreToken(tokenString)
	if err != nil {
		http.Error(w, "Could not store token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}
