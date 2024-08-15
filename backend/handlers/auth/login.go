package auth

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"task/internal/redis"
	"task/models"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Login handler called")

	var loginRequest models.LoginRequest
	err := json.NewDecoder(r.Body).Decode(&loginRequest)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		log.Println("Invalid request payload")
		return
	}
//Debug lines
	log.Printf("Login request received for user: %s\n", loginRequest.Username)

	userID, valid, err := CheckUserCredentials(loginRequest.Username, loginRequest.Password)
	if err != nil || !valid {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		log.Println("Invalid username or password:", err)
		return
	}

	log.Printf("User %s authenticated successfully. Generating token...\n", loginRequest.Username)

	userRole, err := GetUserRole(loginRequest.Username)
	if err != nil {
		http.Error(w, "Could not retrieve user role", http.StatusInternalServerError)
		log.Println("Could not retrieve user role:", err)
		return
	}

	tokenString, err := redis.GenerateToken(strconv.Itoa(userID), userRole)
	if err != nil {
		http.Error(w, "Could not create token", http.StatusInternalServerError)
		log.Println("Could not create token:", err)
		return
	}
//debug lines
	log.Println("Token generated successfully:", tokenString)

	log.Printf("Storing token for user %s...\n", loginRequest.Username)

	err = redis.StoreToken(tokenString)
	if err != nil {
		http.Error(w, "Could not store token", http.StatusInternalServerError)
		log.Println("Could not store token:", err)
		return
	}
//debug lines

	log.Println("Token stored in Redis successfully")

	http.SetCookie(w, &http.Cookie{
		Name:     "Authorization",
		Value:    "Bearer " + tokenString,
		HttpOnly: true,
		Secure:   true, // Set to true in production with HTTPS
		Path:     "/",
	})

	log.Println("Authorization cookie set")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})

	log.Println("Login response sent successfully")
}