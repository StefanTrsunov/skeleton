package server

import (
	"fmt"
	"log"
	"net/http"

	"skeleton/server/internal/database"
	"skeleton/server/internal/handlers"
	"skeleton/server/internal/middleware"
)

func setupRoutes() {
	server := handlers.NewHTTPServer()

	http.HandleFunc("/api/v1/user/create", middleware.CombineMiddleware(server.CreateUser, middleware.CorsHandler, middleware.RequestLogger))
	http.HandleFunc("/api/v1/user/login", middleware.CombineMiddleware(server.LoginUser, middleware.CorsHandler, middleware.RequestLogger))
	http.HandleFunc("/api/v1/user/", middleware.CombineMiddleware(server.GetUser, middleware.CorsHandler, middleware.RequestLogger))
	http.HandleFunc("/api/v1/hello", middleware.CombineMiddleware(server.HelloWorld, middleware.CorsHandler, middleware.RequestLogger))
}

func StartProtoServer() {
	database.InitDB()
	defer database.CloseDB()

	database.CreateTables()

	setupRoutes()

	port := "8000"
	fmt.Println("Go server running at http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
