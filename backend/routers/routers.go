package routers

import (
	"net/http"
	"task/handlers/auth"
	"task/handlers/tasks"
	"task/middlewares"
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

	// Public routes
	router.HandleFunc("/api/login", auth.LoginHandler).Methods("POST")
	//router.HandleFunc("/api/logout", auth.Logout).Methods("POST")
	//router.HandleFunc("/api/checklogin", auth.CheckLogin).Methods("GET")
    router.HandleFunc("/api/testuser",auth.AddUserHandler).Methods("POST")
	//router.HandleFunc("/users", auth.GetUsers).Methods("GET")


	// User routes with authentication
	user := router.PathPrefix("/api/user").Subrouter()
	user.Use(middlewares.AuthMiddleware)
	user.HandleFunc("/tasks", tasks.GetTasks).Methods("GET")

	// Admin routes with authentication and admin check
	admin := router.PathPrefix("/api/admin").Subrouter()
	admin.Use(middlewares.AuthMiddleware)
	admin.Use(middlewares.AdminOnlyMiddleware)

	//Tasks
	admin.HandleFunc("/tasks", tasks.GetAllTasksHandler).Methods("GET")
	admin.HandleFunc("/tasks", tasks.CreateTask).Methods("POST")
	admin.HandleFunc("/tasks/{id}", tasks.UpdateTaskHandler).Methods("PUT")
	admin.HandleFunc("/tasks/{id}", tasks.DeleteTask).Methods("DELETE")
	admin.HandleFunc("/users/{user_id}/tasks/{task_id}", tasks.AssignTask).Methods("POST")

	//User
	admin.HandleFunc("/users", auth.GetUsers).Methods("GET")
	admin.HandleFunc("/users/{id}", auth.GetUser).Methods("GET")
	admin.HandleFunc("/users", auth.AddUserHandler).Methods("POST")
	admin.HandleFunc("/users/{id}", auth.UpdateUserHandler).Methods("PUT")
	admin.HandleFunc("/users/{id}", auth.DeleteUserHandler).Methods("DELETE")

	return router
}
