package auth

// import (
//     "context"
//     "net/http"
//     "task/internal/redis"
//     "log"
// )
// func Logout(w http.ResponseWriter, r *http.Request) {
//     // Debug: Print all cookies
//     cookies := r.Cookies()
//     for _, c := range cookies {
//         log.Printf("Cookie Name: %s, Value: %s", c.Name, c.Value)
//     }

//     cookie, err := r.Cookie("Authorization")
//     if err == nil {
//         token := cookie.Value
//         // Debug: Print the token value
//         log.Printf("Authorization Token: %s", token)
        
//         if err := redis.Rdb.Del(context.Background(), token).Err(); err != nil {
//             log.Printf("Failed to delete token from Redis: %v", err)
//         } else {
//             log.Println("Token successfully deleted from Redis")
//         }
//     } else {
//         log.Println("Authorization cookie not found")
//     }

//     // Debug: Indicate that the cookie is being cleared
//     log.Println("Clearing the Authorization cookie")

//     http.SetCookie(w, &http.Cookie{
//         Name:     "Authorization",
//         Value:    "",
//         Path:     "/",
//         MaxAge:   -1,
//         HttpOnly: true,
//     })

//     log.Println("User logged out successfully")
    
//     w.WriteHeader(http.StatusOK)
//     w.Write([]byte("Logged out successfully"))
// }
