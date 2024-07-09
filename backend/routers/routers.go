package routers

import (
	"net/http"
	"task/handlers/tasks"
	"task/middlewares"
auth "task/handlers/auth"
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
		router.HandleFunc("/api/tasks", tasks.GetAllTasks).Methods("GET")
		router.HandleFunc("/api/tasks", tasks.CreateTask).Methods("POST")
		router.HandleFunc("/api/tasks/{id}", tasks.UpdateTask).Methods("PUT")
		router.HandleFunc("/api/tasks/{id}", tasks.DeleteTask).Methods("DELETE")
		router.HandleFunc("/api/users/{userID}/tasks/{taskID}", tasks.AssignTask).Methods("POST")
	
		// User routes
		router.HandleFunc("/api/users", auth.GetUsers).Methods("GET")
		router.HandleFunc("/api/users/{id}", auth.GetUser).Methods("GET")
		router.HandleFunc("/api/users", auth.AddUserHandler).Methods("POST")
	
		// Login route
		router.HandleFunc("/api/login", auth.Login).Methods("POST")
	
		return router
	}
	