# Authentication App - Go + TypeScript

Full-stack authentication app with Go backend and TypeScript frontend using gRPC protobuf for type safety.

## Tech Stack

- **Backend**: Go + gRPC + PostgreSQL
- **Frontend**: TypeScript + Lit + MVC pattern  
- **Types**: Protobuf-generated for end-to-end type safety
- **Database**: PostgreSQL

## Quick Start

### Prerequisites

- Go 1.21+, Node.js 18+, pnpm, PostgreSQL, docker

### Setup

```bash
# Database
docker-compose up -d

# Generate protobuf types
make proto

# Backend (port 8000)
cd server && go run .

# Frontend (port 5000)  
cd client && pnpm install && pnpm run start
```

## API Endpoints

- `POST /api/v1/user/create` - Register
- `POST /api/v1/user/login` - Login  
- `GET /api/v1/user/` - Profile
- `GET /api/v1/hello` - Health check

## Development

### Type Generation

```bash
make proto            
```

### Adding Features

1. Update `.proto` files
2. Run `make proto`
3. Implement handlers (Go) and controllers (TypeScript)
4. Both sides automatically use updated types

## Architecture Benefits

- **Type Safety**: Protobuf ensures API contract consistency
- **Clean Separation**: HTTP REST for transport, gRPC services for logic
- **Developer Experience**: Auto-generated types prevent API bugs
- **Maintainable**: Clear layer boundaries and responsibilities

## Detailed Architecture

For in-depth architecture documentation:

- **[Server Architecture](./server/README.md)** - Go backend with gRPC services
- **[Client Architecture](./client/README.md)** - TypeScript frontend with MVC pattern
