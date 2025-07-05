package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var db *sql.DB

func InitDB() {
	// Build connection string
	connStr := "host=localhost port=5433 user=skeleton password=skeleton dbname=skeleton sslmode=disable"

	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}

	// Verify connection
	err = db.Ping()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	fmt.Println("Connected to PostgreSQL database!")
}

func CloseDB() {
	if db != nil {
		db.Close()
	}
}
