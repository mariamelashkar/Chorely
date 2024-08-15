package auth

import (
	"encoding/json"
	"net/http"
	"strconv"
	"task/models"
	"github.com/gorilla/mux"
)
func UpdateUserHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id := vars["id"]
    intID, err := strconv.Atoi(id)
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    var updateUser models.User
    err = json.NewDecoder(r.Body).Decode(&updateUser)
    if err != nil {
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }

    Mu.Lock()
    defer Mu.Unlock()

    userFound := false
    for username, user := range Users {
        if user.ID == intID {
            if updateUser.Username != "" {
                user.Username = updateUser.Username
                Users[username] = user
            }
            if updateUser.Email != "" {
                user.Email = updateUser.Email
                Users[username] = user
            }
            if updateUser.Password != "" {
                hashedPassword, err := HashPassword(updateUser.Password)
                if err != nil {
                    http.Error(w, "Error hashing password", http.StatusInternalServerError)
                    return
                }
                user.Password = hashedPassword
                Users[username] = user
            }
            if updateUser.Role != "" {
                user.Role = updateUser.Role
                Users[username] = user
            }
            userFound = true
            json.NewEncoder(w).Encode(map[string]string{"message": "User updated successfully"})
            return
        }
    }

    if !userFound {
        http.Error(w, "User not found", http.StatusNotFound)
    }
}
