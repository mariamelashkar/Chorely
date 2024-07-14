package models

import "time"


type Task struct {
    ID          int       `json:"id"`
    Title       string    `json:"title"`
    Description string    `json:"description"`
    DueDate     string `json:"due_date"`
    Priority    string    `json:"priority"`
    AssignedTo  string    `json:"assigned_to"`
    Status      string    `json:"status"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}

var Tasks []Task
