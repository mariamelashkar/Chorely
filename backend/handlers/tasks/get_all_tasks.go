package tasks
import (
	"task/models"
	"log"
	"encoding/json"
	"net/http"
)



func GetAllTasksHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	tasks, err := GetAllTasks()
	if err != nil {
		http.Error(w, "Failed to fetch tasks", http.StatusInternalServerError)
		log.Printf("Failed to fetch all tasks: %v", err)
		return
	}

	log.Println("Fetched all tasks")
	json.NewEncoder(w).Encode(tasks)
}

func GetAllTasks() ([]models.Task, error) {
	return models.Tasks, nil
}