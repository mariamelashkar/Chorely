package middlewares

import (
	"context"
	"log"
	"net/http"
	"strings"
	"task/internal/redis"

)
type contextKey string

const userIDKey contextKey = "userID"

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Authorization header required", http.StatusUnauthorized)
			log.Println("Authorization header required")
			return
		}

		parts := strings.Split(authHeader, "Bearer ")
		if len(parts) != 2 {
			http.Error(w, "Invalid authorization header format", http.StatusUnauthorized)
			log.Println("Invalid authorization header format")
			return
		}

		tokenString := parts[1]
		claims, err := redis.ParseJWT(tokenString)
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			log.Println("Invalid token:", err)
			return
		}

		// Extract user ID from claims
		userID, ok := claims["user_id"].(float64) // JWT claims are usually float64 for numeric values
		if !ok {
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)
			log.Println("Invalid token claims")
			return
		}

		ctx := context.WithValue(r.Context(), userIDKey, int(userID))
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
