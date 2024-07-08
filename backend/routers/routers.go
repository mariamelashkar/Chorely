package routers

import (
	"net/http"
	admin "task/handlers/admin"
	"task/handlers/tasks"
	"task/middlewares"
users "task/handlers/users"
	"github.com/gorilla/mux"
	"task/handlers/users/auth"
)

	func InitRoutes() *mux.Router {
		router := mux.NewRouter()
	
		// Apply logging middleware to all routes
		router.Use(middlewares.LoggingMiddleware)
	
		// Public route
		router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("Task Management System"))
		}).Methods("GET")
	
		// Auth routes (do not require authentication)
		router.HandleFunc("/api/login", users.Login).Methods("POST")
		router.HandleFunc("/api/users", auth.RegisterUserHandler).Methods("POST")
	
		// Protected API routes
		api := router.PathPrefix("/api").Subrouter()
		api.Use(middlewares.AuthMiddleware)
		api.HandleFunc("/tasks", tasks.GetTasks).Methods("GET")
		api.HandleFunc("/admin/tasks", tasks.GetTasks).Methods("GET")
		api.HandleFunc("/tasks", tasks.CreateTask).Methods("POST")
		api.HandleFunc("/tasks/{id}", tasks.UpdateTask).Methods("PUT")
		api.HandleFunc("/tasks/{id}", tasks.DeleteTask).Methods("DELETE")
	
		// Protected admin routes
		adminSubrouter := router.PathPrefix("/admin").Subrouter()
		adminSubrouter.Use(middlewares.AuthMiddleware)
		adminSubrouter.HandleFunc("/users", admin.GetUsers).Methods("GET")
		adminSubrouter.HandleFunc("/users/{userID}/tasks/{taskID}", tasks.AssignTask).Methods("POST")
	
		return router
	}