package auth


import (
	"golang.org/x/crypto/bcrypt"
)

// func HashPassword(Password string) string {
// 	hashedPassword := sha256.Sum256([]byte(Password))
// 	return hex.EncodeToString(hashedPassword[:])
// }



// HashPassword hashes the plain text password using bcrypt
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashedPassword), err
}

// CheckPasswordHash compares a plain text password with a hashed password
func CheckPasswordHash(password, hash string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}
