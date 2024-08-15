package tasks

import (
	"net/http"
	"strconv"
	"github.com/gorilla/mux"
	"task/handlers/auth"
	"task/models"
	
)

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
