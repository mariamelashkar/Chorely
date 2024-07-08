package auth

import (
	"encoding/json"
	"net/http"
	"task/models"
)


func RegisterUserHandler(w http.ResponseWriter, r *http.Request) {
	var registerRequest models.RegisterRequest
	err := json.NewDecoder(r.Body).Decode(&registerRequest)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	userID, err := RegisterUser(registerRequest.Username, registerRequest.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]int{"user_id": userID})
}
