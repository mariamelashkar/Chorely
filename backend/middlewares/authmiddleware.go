package middlewares

import (
	"context"
	"net/http"
	"task/internal/redis"
	"log"
	"strings"
)

type contextKey string

const (
	UserIDKey   contextKey = "userID"
	UserRoleKey contextKey = "userRole"
)
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Authorization header required", http.StatusUnauthorized)
			log.Println("Authorization header required")
			return
		}

		// Handle token with "Bearer" prefix
		parts := strings.Split(authHeader, "Bearer ")
		if len(parts) != 2 {
			http.Error(w, "Invalid authorization header format", http.StatusUnauthorized)
			log.Println("Invalid authorization header format")
			return
		}

		tokenString := parts[1]
		log.Println("Token received:", tokenString)

		// Validate the token using the ValidateToken function
		claims, err := redis.ValidateToken(tokenString)
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			log.Println("Invalid token:", err)
			return
		}

		// Extract user ID and role from claims
		userID, ok := claims["user_id"].(string)
		if !ok {
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)
			log.Println("Invalid token claims: user_id not found")
			return
		}

		userRole, ok := claims["role"].(string)
		if !ok {
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)
			log.Println("Invalid token claims: role not found")
			return
		}

		log.Printf("User ID: %s, Role: %s\n", userID, userRole)

		// Pass the user ID and role to the context
		ctx := context.WithValue(r.Context(), UserIDKey, userID)
		ctx = context.WithValue(ctx, UserRoleKey, userRole)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
