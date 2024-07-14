package tasks

import (
    "encoding/json"
    "net/http"
    "strconv"
    "task/models"
    log "github.com/sirupsen/logrus"
    "github.com/gorilla/mux"
	"sync"
)

var Mu sync.Mutex

func UpdateTaskHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id := vars["id"]
    intID, err := strconv.Atoi(id)
    if err != nil {
        log.WithFields(log.Fields{
            "id":    id,
            "error": err,
        }).Error("Invalid task ID")
        http.Error(w, "Invalid task ID", http.StatusBadRequest)
        return
    }

    var updateTask models.Task
    err = json.NewDecoder(r.Body).Decode(&updateTask)
    if err != nil {
        log.WithError(err).Error("Failed to decode task")
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }

    Mu.Lock()
    defer Mu.Unlock()

    taskFound := false
    for i, task := range models.Tasks {
        if task.ID == intID {
            log.WithFields(log.Fields{
                "id": intID,
            }).Info("Task found, updating task")
            if updateTask.Title != "" {
                task.Title = updateTask.Title
            }
            if updateTask.Description != "" {
                task.Description = updateTask.Description
            }
            if updateTask.DueDate != "" {
                task.DueDate = updateTask.DueDate
            }
            if updateTask.Priority != "" {
                task.Priority = updateTask.Priority
            }
            if updateTask.AssignedTo != "" {
                task.AssignedTo = updateTask.AssignedTo
            }
            if updateTask.Status != "" {
                task.Status = updateTask.Status
            }
            models.Tasks[i] = task
            log.WithFields(log.Fields{
                "id": intID,
            }).Info("Task updated successfully")
            w.Header().Set("Content-Type", "application/json")
            json.NewEncoder(w).Encode(map[string]string{"message": "Task updated successfully"})
            return
        }
    }

    if !taskFound {
        log.WithFields(log.Fields{
            "id": intID,
        }).Warn("Task not found")
        http.Error(w, "Task not found", http.StatusNotFound)
    }
}
