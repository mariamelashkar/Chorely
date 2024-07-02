package handlers

import (
	"encoding/json"
	"net/http"
	"task/handlers/admin"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	for _, user := range admin.Users {
		if user.Username == req.Username && user.Password == req.Password {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{
				"role": user.Role,
				"id":   user.ID,
			})
			return
		}
	}

	http.Error(w, "Invalid username or password", http.StatusUnauthorized)
}
