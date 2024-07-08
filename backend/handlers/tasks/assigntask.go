package tasks

import (
	"net/http"
	"strconv"
	"github.com/gorilla/mux"
    admin "task/handlers/admin"
)

func AssignTask(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	userID, err := strconv.Atoi(params["userID"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}
	taskID, err := strconv.Atoi(params["taskID"])
	if err != nil {
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	// Iterate over the map to find the user by userID
	for username, user := range admin.Users {
		if user.ID == userID {
			// Modify the user's task list
			user.Tasks = append(user.Tasks, taskID)
			// Reassign the modified user back to the map
			admin.Users[username] = user
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}
	http.Error(w, "User not found", http.StatusNotFound)
}