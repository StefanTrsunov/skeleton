# Backend Server - Go + gRPC

Clean architecture Go server with HTTP handlers bridging to gRPC protobuf services.

## Directory Structure

```text
server/
├── main.go
├── internal/
│   ├── server/          # HTTP server setup
│   ├── handlers/        # HTTP-to-gRPC bridge
│   ├── services/        # gRPC service implementations
│   ├── middleware/      # HTTP middleware
│   └── database/        # PostgreSQL operations
└── gen/                 # Generated protobuf code
```

## Key Components

### HTTP Layer

- **server.go**: Server setup, routing, middleware chain
- **handlers/user.go**: HTTP endpoints bridging to gRPC services
- **middleware.go**: CORS, logging, authentication

### Business Layer

- **services/user_service.go**: User business logic (implements protobuf interface)
- **services/auth_service.go**: Authentication and authorization logic

### Data Layer

- **database/db.go**: PostgreSQL connection, operations, table management

## API Endpoints

- `POST /api/v1/user/create` - Register new user
- `POST /api/v1/user/login` - Authenticate user  
- `GET /api/v1/user/` - Get user profile
- `GET /api/v1/hello` - Health check

## Configuration

Environment variables:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - Database config
- `DB_SSL_MODE` - SSL mode (default: disable)

## Development

### Adding Features

1. Define service in `.proto` files
2. Generate code: `make proto`
3. Implement gRPC service in `internal/services/`
4. Add HTTP handler in `internal/handlers/`
5. Register route in `internal/server/server.go`

### Architecture Benefits

- **Type Safety**: Protobuf ensures consistent contracts
- **Clean Separation**: HTTP transport vs business logic
- **Testability**: Services testable independently
- **Maintainability**: Clear layer boundaries
