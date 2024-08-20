package tasks

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"task/middlewares"
	"task/models"
)

// GetTasks godoc
// @Summary Get tasks for a user
// @Description Retrieves all tasks for the authenticated user
// @Tags Tasks
// @Produce  json
// @Success 200 {array} models.Task "List of tasks"
// @Failure 401 {string} string "Unauthorized"
// @Security BearerAuth
// @Router /api/user/tasks [get]
func GetTasks(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    var userID string

    userIDStr := r.URL.Query().Get("user_id")
    if userIDStr != "" {
        userID = userIDStr
    } else {
        userIDInt, ok := r.Context().Value(middlewares.UserIDKey).(int)
        if !ok {
            http.Error(w, "User not found", http.StatusUnauthorized)
            log.Println("User not found in context")
            return
        }
        userID = strconv.Itoa(userIDInt)
    }

    tasks, err := GetTasksByUserID(userID)
    if err != nil {
        http.Error(w, "Failed to fetch tasks", http.StatusInternalServerError)
        log.Printf("Failed to fetch tasks for user %s: %v", userID, err)
        return
    }

    log.Printf("Fetched tasks for user %s", userID)
    json.NewEncoder(w).Encode(tasks)
}
func GetTasksByUserID(userID string) ([]models.Task, error) {
	var userTasks []models.Task
	for _, task := range models.Tasks {
		if task.AssignedTo == userID {
			userTasks = append(userTasks, task)
		}
	}
	return userTasks, nil
}