package auth

import (
	"crypto/sha256"
	"encoding/hex"
)


func HashPassword(Password string) string {
	hashedPassword := sha256.Sum256([]byte(Password))
	return hex.EncodeToString(hashedPassword[:])
}