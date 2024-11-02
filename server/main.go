package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	// _ "github.com/StefanTrsunov/skeleton/gen/go/proto"
	_ "github.com/lib/pq"
)

var db *sql.DB

func init() {
	var err error
	connStr := "user=postgres dbname=postgres password=mysecretpassword host=localhost port=5434 sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	if err := db.Ping(); err != nil {
		log.Fatalf("Unable to ping database: %v\n", err)
	}
	log.Println("Connected to the database")

	// Create table if it doesn't exist
	err = createTable()
	if err != nil {
		log.Fatalf("Error creating table: %v\n", err)
	}
	log.Println("Table created successfully!")
}

func createTable() error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS todos (
		id SERIAL PRIMARY KEY,
		task TEXT NOT NULL,
		completed BOOLEAN NOT NULL DEFAULT FALSE
	)`)
	return err
}

func getTodos(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		// Handle preflight requests
		w.WriteHeader(http.StatusOK)
		return
	}

	rows, err := db.Query("SELECT id, task, completed FROM todos")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var todos []map[string]interface{}
	for rows.Next() {
		var id int
		var task string
		var completed bool
		if err := rows.Scan(&id, &task, &completed); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		todos = append(todos, map[string]interface{}{
			"id":        id,
			"task":      task,
			"completed": completed,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(todos); err != nil {
		http.Error(w, "Error encoding JSON response", http.StatusInternalServerError)
	}
}

func addTodo(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		// Handle preflight requests
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method == http.MethodPost {
		var todo struct {
			Task string `json:"task"`
		}
		if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		_, err := db.Exec("INSERT INTO todos (task) VALUES ($1)", todo.Task)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

func main() {
	// http://http://localhost:8081/todos
	http.HandleFunc("/todos", getTodos)
	// http://http://localhost:8081/todos/add
	http.HandleFunc("/todos/add", addTodo)
	http.Handle("/", http.FileServer(http.Dir("./public")))
	log.Fatal(http.ListenAndServe(":8081", nil)) // Ensure this port matches your frontend
}
