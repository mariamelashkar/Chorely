package auth

import (
	"sync"
	"task/models"
)

var (
	Mu            sync.Mutex
	Users         = map[string]models.User{} // username: User struct
	UserIDs       = map[string]int{}         // username: userID
	UserIDCounter = 1
)
