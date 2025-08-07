package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	apiv1 "skeleton/server/gen"
	"skeleton/server/internal/services"
)

// HTTPServer implements HTTP handlers that call the protobuf service methods
type HTTPServer struct {
	userService *services.UserServiceImpl
}

// NewHTTPServer creates a new HTTP server instance
func NewHTTPServer() *HTTPServer {
	return &HTTPServer{
		userService: &services.UserServiceImpl{},
	}
}

// CreateUser handles POST /api/v1/user/create
func (s *HTTPServer) CreateUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req apiv1.CreateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	response, err := s.userService.CreateUser(context.Background(), &req)
	if err != nil {
		http.Error(w, "Registration failed", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// LoginUser handles POST /api/v1/user/login
func (s *HTTPServer) LoginUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req apiv1.LoginUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	response, err := s.userService.LoginUser(context.Background(), &req)
	if err != nil {
		http.Error(w, "Login failed", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// GetUser handles GET /api/v1/user/{user_id}
func (s *HTTPServer) GetUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Extract user_id from URL path
	path := strings.TrimPrefix(r.URL.Path, "/api/v1/user/")
	userID, err := strconv.Atoi(path)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	req := &apiv1.GetUserRequest{
		UserId: int32(userID),
	}

	response, err := s.userService.GetUser(context.Background(), req)
	if err != nil {
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// HelloWorld handles GET /api/v1/hello
func (s *HTTPServer) HelloWorld(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	req := &apiv1.HelloWorldRequest{}
	response, err := s.userService.HelloWorld(context.Background(), req)
	if err != nil {
		http.Error(w, "Failed to get hello message", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
