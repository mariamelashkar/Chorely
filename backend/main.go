package main

import (
	"net/http"
	"task/routers"
	"github.com/rs/cors"
	"log"
	"github.com/joho/godotenv"
	"task/internal/redis"


)

func main() {
	router := routers.InitRoutes()
	redis.InitRedis()

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	// Configure CORS settings
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Allow all origins, you can specify your frontend URL here
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Origin", "Authorization", "Access-Control-Allow-Origin", "Content-Type"},
		ExposedHeaders:   []string{"Content-Length", "Access-Control-Allow-Origin"},
		AllowCredentials: true,
	})

	handler := corsHandler.Handler(router)

	log.Println("Server started at :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
