package redis

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"os"
)

var (
	Client    *redis.Client
	Ctx       = context.Background()
	JwtSecret = []byte(os.Getenv("JWT_SECRET"))
)

func InitRedis() {
	redisAddr := os.Getenv("REDIS_ADDR")
	if redisAddr == "" {
		redisAddr = "localhost:6379"
	}

	Client = redis.NewClient(&redis.Options{
		Addr: redisAddr,
		DB:   0, // use default DB
	})

	_, err := Client.Ping(Ctx).Result()
	if err != nil {
		fmt.Printf("Error connecting to Redis: %v\n", err)
		panic(err)
	}
	fmt.Println("Connected to Redis")
}
