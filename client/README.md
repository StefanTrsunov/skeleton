# Frontend - TypeScript MVC

TypeScript frontend using MVC pattern with Lit web components and protobuf-generated types.

## Directory Structure

```text
src/
├── main.ts
├── index.html
├── models/             # State management
├── views/              # UI components (Lit)
├── controllers/        # Business logic
├── services/           # API communication
└── generated/          # Proto-generated types
```

## Key Components

### Views (UI Layer)

- **AppView.ts**: Main application container with routing
- **LoginView.ts**: Authentication forms (login/register)
- **ProfileView.ts**: User profile display
- Built with Lit web components for reactive UI

### Controllers (Business Logic)

- **AppController.ts**: Application-level state and operations
- **UserController.ts**: User authentication flow coordination
- Bridges Views and Models, handles validation

### Models (State Management)

- **UserModel.ts**: User state, authentication status, data persistence
- Pure data logic without UI concerns

### Services (API Layer)

- **ApiService.ts**: HTTP client for backend communication
- Uses protobuf-generated types for type safety

## Development

### Adding Features

1. **New UI**: Create Lit component in `views/`
2. **Business Logic**: Add controller in `controllers/`
3. **State**: Extend models in `models/`
4. **API**: Update service in `services/`
5. **Types**: Regenerate from protobuf with `pnpm run proto:generate`

### MVC Benefits

- **Separation of Concerns**: Clear layer responsibilities
- **Type Safety**: Protobuf-generated types prevent API bugs
- **Testability**: Each layer testable independently
- **Maintainability**: Predictable structure for changes
