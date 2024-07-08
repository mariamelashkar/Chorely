package auth

import (
	"crypto/sha256"
	"encoding/hex"
)


func HashPassword(password string) string {
	hashedPassword := sha256.Sum256([]byte(password))
	return hex.EncodeToString(hashedPassword[:])
}