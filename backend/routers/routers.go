package routers

import (
	"net/http"
	admin "task/handlers/admin"
	login "task/handlers/login"
	"task/handlers/tasks"
	"task/middlewares"

	"github.com/gorilla/mux"
)

func InitRoutes() *mux.Router {
	router := mux.NewRouter()

	router.Use(middlewares.LoggingMiddleware)

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Task Management System"))
	}).Methods("GET")

	
	router.HandleFunc("/api/tasks", tasks.GetTasks).Methods("GET")
	router.HandleFunc("/api/admin/tasks", tasks.GetTasks).Methods("GET")
	router.HandleFunc("/api/tasks", tasks.CreateTask).Methods("POST")
	router.HandleFunc("/api/tasks/{id}", tasks.UpdateTask).Methods("PUT")
	router.HandleFunc("/api/tasks/{id}", tasks.DeleteTask).Methods("DELETE")

	router.HandleFunc("/api/users", admin.GetUsers).Methods("GET")
	router.HandleFunc("/api/users", admin.CreateUser).Methods("POST")
	router.HandleFunc("/api/users/{userID}/tasks/{taskID}", tasks.AssignTask).Methods("POST")

	router.HandleFunc("/api/login", login.Login).Methods("POST")

	return router
}
