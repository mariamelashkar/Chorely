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

	for i, user := range admin.Users {
		if user.ID == userID {
			admin.Users[i].Tasks = append(admin.Users[i].Tasks, taskID)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}
	http.Error(w, "User not found", http.StatusNotFound)
}
