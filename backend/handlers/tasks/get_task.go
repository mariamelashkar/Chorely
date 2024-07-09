package tasks

import (
	"encoding/json"
	"net/http"
	"strconv"
	"task/models"
    auth  "task/handlers/auth"
)


func GetTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	userID, err := strconv.Atoi(r.URL.Query().Get("user_id"))
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	var userTasks []models.Task
	for _, task := range Tasks {
		for _, user := range auth.Users {
			if user.ID == userID {
				for _, tID := range user.Tasks {
					if tID == task.ID {
						userTasks = append(userTasks, task)
					}
				}
			}
		}
	}

	json.NewEncoder(w).Encode(userTasks)
}

func GetAllTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Tasks)
}