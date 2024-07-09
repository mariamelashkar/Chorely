package models

type Task struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	DueDate     string `json:"due_date"`
	Priority    string `json:"priority"`
	Completed   bool   `json:"completed"`
	AssignedTo  string `json:"assigned_to"` 
}
