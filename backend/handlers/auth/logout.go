package auth

import (
    "net/http"
    "task/internal/redis"
    "log"
	"strings"
)

// LogoutHandler godoc
// @Summary Logs out a user
// @Description Logs out a user by invalidating the JWT token
// @Tags Authentication
// @Produce  json
// @Success 200 {string} string "Logged out successfully"
// @Failure 401 {string} string "Invalid token or token already expired"
// @Security BearerAuth
// @Router /api/logout [post]
func Logout(w http.ResponseWriter, r *http.Request) {
    // Extract the Authorization token from the request header
    authHeader := r.Header.Get("Authorization")
    if authHeader == "" {
        log.Println("Authorization header is missing")
        http.Error(w, "Authorization header is missing", http.StatusUnauthorized)
        return
    }

    // Split the Bearer token
    parts := strings.Split(authHeader, " ")
    if len(parts) != 2 {
        log.Println("Invalid authorization header format")
        http.Error(w, "Invalid authorization header format", http.StatusUnauthorized)
        return
    }

    tokenString := parts[1]
    log.Printf("Token received: %s", tokenString)

    // Remove the token from Redis using your existing RemoveToken function
    if err := redis.RemoveToken(tokenString); err != nil {
        log.Printf("Failed to remove token: %v", err)
        http.Error(w, "Invalid token or token already expired", http.StatusUnauthorized)
        return
    }

    // Clear the Authorization cookie
    http.SetCookie(w, &http.Cookie{
        Name:     "Authorization",
        Value:    "",
        Path:     "/",
        MaxAge:   -1,
        HttpOnly: true,
    })

    log.Println("User logged out successfully")
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Logged out successfully"))
}
