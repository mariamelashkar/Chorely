package config

import (
	"log"
	"os"
	"github.com/joho/godotenv"
)
var JwtSecret []byte

func InitConfig() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    secret := os.Getenv("JWT_SECRET")
    if secret == "" {
        log.Fatal("JWT_SECRET is not set")
    }

    JwtSecret = []byte(secret) // Directly use the secret as a byte slice

    log.Printf("Using JwtSecret: %s\n", JwtSecret)
}
