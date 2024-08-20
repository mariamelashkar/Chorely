package tasks
import (
	"task/models"
	"log"
	"encoding/json"
	"net/http"
)

// GetAllTasksHandler godoc
// @Summary Get all tasks
// @Description Retrieves all tasks in the system (admin only)
// @Tags Tasks
// @Produce  json
// @Success 200 {array} models.Task "List of tasks"
// @Failure 401 {string} string "Unauthorized"
// @Security BearerAuth
// @Router /api/admin/tasks [get]
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