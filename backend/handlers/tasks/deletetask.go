package tasks

import (
    "net/http"
    "github.com/gorilla/mux"
    "strconv"
	"task/models"

)
// DeleteTask godoc
// @Summary Delete a task
// @Description Deletes a task from the system (admin only)
// @Tags Tasks
// @Produce  json
// @Param id path int true "Task ID"
// @Success 204 {string} string "Task deleted successfully"
// @Failure 401 {string} string "Unauthorized"
// @Failure 404 {string} string "Task not found"
// @Security BearerAuth
// @Router /api/admin/tasks/{id} [delete]
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	taskID, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	for i, task := range models.Tasks {
		if task.ID == taskID {
			models.Tasks = append(models.Tasks[:i], models.Tasks[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}
	http.Error(w, "Task not found", http.StatusNotFound)
}

    