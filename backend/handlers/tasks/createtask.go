package tasks

import (
	"encoding/json"
	"net/http"
	"task/models"
	"time"
	"github.com/sirupsen/logrus"

)
// CreateTask godoc
// @Summary Create a new task
// @Description Creates a new task in the system (admin only)
// @Tags Tasks
// @Accept  json
// @Produce  json
// @Param task body models.Task true "Task Data"
// @Success 201 {object} models.Task "Created task"
// @Failure 400 {string} string "Invalid request payload"
// @Failure 401 {string} string "Unauthorized"
// @Security BearerAuth
// @Router /api/admin/tasks [post]
var (
	TaskCounter   = 1
)
func CreateTask(w http.ResponseWriter, r *http.Request) {
    var task models.Task

    err := json.NewDecoder(r.Body).Decode(&task)
    if err != nil {
        logrus.WithError(err).Error("Failed to decode task from request body")
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }

    task.ID = len(models.Tasks) + 1
    task.CreatedAt = time.Now()
    task.UpdatedAt = time.Now()
    models.Tasks = append(models.Tasks, task)

    logrus.WithFields(logrus.Fields{
        "ID":          task.ID,
        "Title":       task.Title,
        "AssignedTo":  task.AssignedTo,
        "DueDate":     task.DueDate,
        "Priority":    task.Priority,
        "Status":      task.Status,
    }).Info("Task created successfully")

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(task)
}