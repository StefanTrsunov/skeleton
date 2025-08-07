package services

import (
	"context"

	apiv1 "skeleton/server/gen"
	"skeleton/server/internal/database"

	"golang.org/x/crypto/bcrypt"
)

// UserServiceImpl implements the UserService from protobuf
type UserServiceImpl struct {
	apiv1.UnimplementedUserServiceServer
}

// CreateUser implements the protobuf service method
func (s *UserServiceImpl) CreateUser(ctx context.Context, req *apiv1.CreateUserRequest) (*apiv1.CreateUserResponse, error) {
	// Check if username already exists
	var count int
	err := database.DB.QueryRow("SELECT COUNT(*) FROM users WHERE username = $1", req.Username).Scan(&count)
	if err != nil {
		return &apiv1.CreateUserResponse{Success: false, Message: "Database error"}, err
	}

	if count > 0 {
		return &apiv1.CreateUserResponse{Success: false, Message: "Username already exists"}, nil
	}

	// Validate password length
	if len(req.Password) < 6 {
		return &apiv1.CreateUserResponse{Success: false, Message: "Password must be at least 6 characters"}, nil
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return &apiv1.CreateUserResponse{Success: false, Message: "Failed to hash password"}, err
	}

	// Insert new user
	var userID int
	err = database.DB.QueryRow("INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id", req.Username, string(hashedPassword)).Scan(&userID)
	if err != nil {
		return &apiv1.CreateUserResponse{Success: false, Message: "Failed to create user"}, err
	}

	user := &apiv1.User{
		Id:       int32(userID),
		Username: req.Username,
	}

	return &apiv1.CreateUserResponse{
		Success: true,
		Message: "Registration successful",
		User:    user,
	}, nil
}

func (s *UserServiceImpl) LoginUser(ctx context.Context, req *apiv1.LoginUserRequest) (*apiv1.LoginUserResponse, error) {
	// Get user from database
	var user apiv1.User
	var passwordHash string
	err := database.DB.QueryRow("SELECT id, username, password_hash FROM users WHERE username = $1", req.Username).Scan(&user.Id, &user.Username, &passwordHash)
	if err != nil {
		return &apiv1.LoginUserResponse{Success: false, Message: "Invalid credentials"}, nil
	}

	// Check password
	err = bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(req.Password))
	if err != nil {
		return &apiv1.LoginUserResponse{Success: false, Message: "Invalid credentials"}, nil
	}

	return &apiv1.LoginUserResponse{
		Success: true,
		Message: "Login successful",
		User:    &user,
	}, nil
}

func (s *UserServiceImpl) GetUser(ctx context.Context, req *apiv1.GetUserRequest) (*apiv1.GetUserResponse, error) {
	var user apiv1.User
	err := database.DB.QueryRow("SELECT id, username FROM users WHERE id = $1", req.UserId).Scan(&user.Id, &user.Username)
	if err != nil {
		return &apiv1.GetUserResponse{Success: false, Message: "User not found"}, nil
	}

	return &apiv1.GetUserResponse{
		Success: true,
		Message: "User found",
		User:    &user,
	}, nil
}

func (s *UserServiceImpl) HelloWorld(ctx context.Context, req *apiv1.HelloWorldRequest) (*apiv1.HelloWorldResponse, error) {
	return &apiv1.HelloWorldResponse{
		Message: "Hello, World from protobuf!",
	}, nil
}
