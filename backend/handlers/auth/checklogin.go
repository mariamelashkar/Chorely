package auth

// import (
//     "encoding/json"
//     "net/http"
//     "strings"
//     "task/internal/redis"
// )

// func CheckLogin(w http.ResponseWriter, r *http.Request) {
//     cookie, err := r.Cookie("Authorization")
//     if err != nil {
//         http.Error(w, "Authorization cookie required", http.StatusUnauthorized)
//         return
//     }

//     parts := strings.Split(cookie.Value, "Bearer ")
//     if len(parts) != 2 {
//         http.Error(w, "Invalid authorization cookie format", http.StatusUnauthorized)
//         return
//     }

//     tokenString := parts[1]
//     claims, err := redis.ParseJWT(tokenString)
//     if err != nil {
//         http.Error(w, "Invalid token", http.StatusUnauthorized)
//         return
//     }

//     userID, ok := claims["user_id"].(float64)
//     if !ok {
//         http.Error(w, "Invalid token claims", http.StatusUnauthorized)
//         return
//     }

//     userRole, ok := claims["role"].(string)
//     if !ok {
//         http.Error(w, "Invalid token claims", http.StatusUnauthorized)
//         return
//     }

//     response := map[string]interface{}{
//         "user_id": userID,
//         "role":    userRole,
//     }

//     w.Header().Set("Content-Type", "application/json")
//     json.NewEncoder(w).Encode(response)
// }
