package auth

import (
    "errors"
)

func GetUserRole(username string) (string, error) {
    Mu.Lock()
    defer Mu.Unlock()

    user, exists := Users[username]
    if !exists {
        return "", errors.New("user role not found")
    }

    return user.Role, nil
}
