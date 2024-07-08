package auth

import (
    "encoding/json"
    "net/http"
    "task/models"
)

func Signup(w http.ResponseWriter, r *http.Request) {
    var user models.User
    json.NewDecoder(r.Body).Decode(&user)
    w.WriteHeader(http.StatusCreated)
}