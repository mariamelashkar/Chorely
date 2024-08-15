
package middlewares

import (
	"net/http"
	"log"
)

func AdminOnlyMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userRole, ok := r.Context().Value(UserRoleKey).(string)
		if !ok || userRole != "admin" {
			http.Error(w, "Forbidden", http.StatusForbidden)
			log.Println("Forbidden: user does not have admin role")
			return
		}
		next.ServeHTTP(w, r)
	})
}
