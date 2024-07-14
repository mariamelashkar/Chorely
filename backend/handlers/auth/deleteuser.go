package auth

import (
    "net/http"
    "github.com/gorilla/mux"
	"encoding/json"
	"strconv"


)
func DeleteUserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userIDStr := vars["id"]

	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	Mu.Lock()
	defer Mu.Unlock()

	var username string
	var exists bool
	for u, id := range UserIDs {
		if id == userID {
			username = u
			exists = true
			break
		}
	}

	if !exists {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	delete(Users, username)
	delete(UserIDs, username)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "User deleted successfully"})
}