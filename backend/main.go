package main

import (
	"net/http"
	"task/routers"
	"log"
	"task/internal/redis"
	"task/config"
    "github.com/swaggo/http-swagger"
	_ "task/docs"

)
// @title Task Management System APIs
// @description This is a sample server for a Task Management System.
// @termsOfService http://swagger.io/terms/
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {

		config.InitConfig()	
		router := routers.InitRoutes()
		redis.InitRedis()
	router.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)

	log.Println("Server started at :8081")
	log.Fatal(http.ListenAndServe(":8081", router))
}