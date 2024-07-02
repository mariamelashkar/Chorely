package tasks

import (
    "encoding/json"
    "net/http"
    "task/models"
    log "github.com/sirupsen/logrus"
)

var Tasks = []models.Task{}
var TaskCounter = 1 
func CreateTask(w http.ResponseWriter, r *http.Request) {
	var task models.Task
	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		log.WithError(err).Error("Failed to decode task")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	task.ID = TaskCounter
	Tasks = append(Tasks, task)
	TaskCounter++

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}