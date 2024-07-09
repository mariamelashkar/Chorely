package routers

import (
	"net/http"
	admin "task/handlers/admin"
	"task/handlers/tasks"
	"task/middlewares"
users "task/handlers/users"
	"github.com/gorilla/mux"
)

	func InitRoutes() *mux.Router {
		router := mux.NewRouter()

		// Use the logging middleware
		router.Use(middlewares.LoggingMiddleware)
	
		// Home route
		router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("Task Management System"))
		}).Methods("GET")
	
		// Task routes
		router.HandleFunc("/api/tasks", tasks.GetTasks).Methods("GET")
		router.HandleFunc("/api/tasks", tasks.CreateTask).Methods("POST")
		router.HandleFunc("/api/tasks/{id}", tasks.UpdateTask).Methods("PUT")
		router.HandleFunc("/api/tasks/{id}", tasks.DeleteTask).Methods("DELETE")
	
		// Admin task routes
		router.HandleFunc("/api/admin/tasks", tasks.GetTasks).Methods("GET")
		router.HandleFunc("/api/users/{userID}/tasks/{taskID}", tasks.AssignTask).Methods("POST")
	
		// User routes
		router.HandleFunc("/api/users", admin.GetUsers).Methods("GET")
		router.HandleFunc("/api/users/{id}", admin.GetUser).Methods("GET")
		router.HandleFunc("/api/users", admin.CreateUser).Methods("POST")
	
		// Login route
		router.HandleFunc("/api/login", users.Login).Methods("POST")
	
		return router
	}
	