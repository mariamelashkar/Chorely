package auth

import (
	"encoding/json"
	"net/http"
	"strconv"
	"task/models"
	"github.com/gorilla/mux"
)
// UpdateUserHandler godoc
// @Summary Update an existing user
// @Description Updates the details of an existing user (admin only)
// @Tags Users
// @Accept  json
// @Produce  json
// @Param id path int true "User ID"
// @Param user body models.User true "User Data"
// @Success 200 {object} models.User "Updated user"
// @Failure 400 {string} string "Invalid request payload"
// @Failure 401 {string} string "Unauthorized"
// @Failure 404 {string} string "User not found"
// @Security BearerAuth
// @Router /api/admin/users/{id} [put]
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
