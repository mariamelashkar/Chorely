package tasks

import (
	"net/http"
	"strconv"
	"github.com/gorilla/mux"
	"task/handlers/auth"
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

	for username, user := range auth.Users {
		if user.ID == userID {
			user.Tasks = append(user.Tasks, taskID)
			auth.Users[username] = user
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}
	http.Error(w, "User not found", http.StatusNotFound)
}