package auth

import (
	"encoding/json"
	"net/http"
	"strconv"
	"task/models"
	"github.com/gorilla/mux"
	"errors"
)


func GetUsers(w http.ResponseWriter, r *http.Request) {
    Mu.Lock()
    defer Mu.Unlock()

    var usersWithoutPassword []models.User
    for _, user := range Users {
        userWithoutPassword := user
        userWithoutPassword.Password = ""
        usersWithoutPassword = append(usersWithoutPassword, userWithoutPassword)
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(usersWithoutPassword)
}


func GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	user, err := GetUserByID(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(user)
}

//internal functions 

func GetAllUsers() ([]models.User, error) {
	Mu.Lock()
	defer Mu.Unlock()

	allUsers := []models.User{}
	for _, user := range Users{
		allUsers = append(allUsers, user)
	}
	return allUsers, nil
}

func GetUserByID(id int) (models.User, error) {
	Mu.Lock()
	defer Mu.Unlock()

	for _, user := range Users {
		if user.ID == id {
			return user, nil
		}
	}
	return models.User{}, errors.New("user not found")
}