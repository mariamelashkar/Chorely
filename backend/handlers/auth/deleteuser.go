package auth

import (
    "net/http"
    "github.com/gorilla/mux"
	"encoding/json"
	"strconv"


)

// DeleteUserHandler godoc
// @Summary Delete a user
// @Description Deletes a user from the system (admin only)
// @Tags Users
// @Produce  json
// @Param id path int true "User ID"
// @Success 204 {string} string "User deleted successfully"
// @Failure 401 {string} string "Unauthorized"
// @Failure 404 {string} string "User not found"
// @Security BearerAuth
// @Router /api/admin/users/{id} [delete]
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