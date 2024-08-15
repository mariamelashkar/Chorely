package auth

// import (
//     "log"
//     "os"
//     "task/models"
// )

// const setupFlagFile = "setup_done.flag"

// func Initialize() {
//     if _, err := os.Stat(setupFlagFile); os.IsNotExist(err) {
//         log.Println("No setup flag found, creating default admin user")
        
//         initialUser := models.User{
//             Username: "admin",
//             Email:    "admin@example.com",
//             Password: "admin",
//             Role:     "admin",
//         }

     
//         _,err =AddUser(initialUser.Username,initialUser.Email,initialUser.Password,initialUser.Role)
//         if err != nil {
//             log.Fatalf("Failed to add initial user: %v", err)
//         }

//         file, err := os.Create(setupFlagFile)
//         if err != nil {
//             log.Fatalf("Failed to create setup flag file: %v", err)
//         }
//         defer file.Close()

//         log.Println("Initial user added successfully and setup flag created")
//     } else {
//         log.Println("Setup flag found, skipping creation of default admin user")
//     }
// }
