package tasks

import (
	"net/http"
	"strconv"
	"github.com/gorilla/mux"
	"task/handlers/auth"
	"task/models"
	
)
// AssignTask godoc
// @Summary Assign a task to a user
// @Description Assigns an existing task to a specific user (admin only)
// @Tags Tasks
// @Accept  json
// @Produce  json
// @Param user_id path int true "User ID"
// @Param task_id path int true "Task ID"
// @Success 200 {object} models.Task "Task assigned successfully"
// @Failure 400 {string} string "Invalid request payload"
// @Failure 401 {string} string "Unauthorized"
// @Failure 404 {string} string "User or Task not found"
// @Security BearerAuth
// @Router /api/admin/users/{user_id}/tasks/{task_id} [post]
func AssignTask(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    userID, err := strconv.Atoi(params["user_id"])
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }
    taskID, err := strconv.Atoi(params["task_id"])
    if err != nil {
        http.Error(w, "Invalid task ID", http.StatusBadRequest)
        return
    }

    // Assign the task to the user
    for username, user := range auth.Users {
        if user.ID == userID {
            user.Tasks = append(user.Tasks, taskID)
            auth.Users[username] = user

            // Update the task with the assigned user
            err := UpdateTask(taskID, models.Task{
                AssignedTo: strconv.Itoa(userID),
            })
            if err != nil {
                http.Error(w, "Failed to update task assignment", http.StatusInternalServerError)
                return
            }

            w.WriteHeader(http.StatusNoContent)
            return
        }
    }

    http.Error(w, "User not found", http.StatusNotFound)
}
