package auth

import (
    "crypto/sha256"
    "encoding/hex"
    "errors"
    "log"
)

func HashPassword(password string) (string, error) {
    if password == "" {
        log.Println("HashPassword: password cannot be empty")
        return "", errors.New("password cannot be empty")
    }
    hashedPassword := sha256.Sum256([]byte(password))
    hashString := hex.EncodeToString(hashedPassword[:])
    log.Printf("HashPassword: password hashed successfully: %s", hashString)
    return hashString, nil
}

func CheckPasswordHash(password, hash string) error {
    hashedPassword, err := HashPassword(password)
    if err != nil {
        log.Println("CheckPasswordHash: error hashing password:", err)
        return err
    }
    if hashedPassword != hash {
        log.Println("CheckPasswordHash: password mismatch")
        return errors.New("password mismatch")
    }
    log.Println("CheckPasswordHash: password match")
    return nil
}
