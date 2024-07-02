package admin

import (
	"encoding/json"
	"net/http"
	"task/models"
	"log"
)

var Users = []models.User{}
var UserID = 1

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		log.Println("Failed to decode user:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	user.ID = UserID
	UserID++
	user.Tasks = []int{} // Initialize tasks as an empty slice
	Users = append(Users, user)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}
