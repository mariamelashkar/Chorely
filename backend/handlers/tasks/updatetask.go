package tasks

import (
    "encoding/json"
    "net/http"
    "strconv"
    "task/models"

    log "github.com/sirupsen/logrus"
    "github.com/gorilla/mux"
)


func UpdateTask(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	taskID, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	var updatedTask models.Task
	err = json.NewDecoder(r.Body).Decode(&updatedTask)
	if err != nil {
		log.WithError(err).Error("Failed to decode task")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for i, task := range Tasks {
		if task.ID == taskID {
			Tasks[i] = updatedTask
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(updatedTask)
			return
		}
	}
	http.Error(w, "Task not found", http.StatusNotFound)
}
