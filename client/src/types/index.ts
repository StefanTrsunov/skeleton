// Re-export generated protobuf types
export type {
  User,
  CreateUserRequest,
  CreateUserResponse,
  LoginUserRequest,
  LoginUserResponse,
  GetUserRequest,
  GetUserResponse,
} from '../generated/user';

export type {
  HelloWorldRequest,
  HelloWorldResponse,
} from '../generated/api';

// Import User type for use in compatibility types
import type { User } from '../generated/user';

// UI-specific types that are not covered by protobuf definitions
export interface FormState {
  username: string;
  password: string;
}

export interface StatusState {
  message: string;
  type: 'error' | 'success' | 'info' | '';
}

// Compatibility types for existing code
export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse extends ApiResponse {
  user?: User;
}

export interface RegisterResponse extends ApiResponse {
  user?: User;
}

// Controller Result Types
export interface ControllerResult {
  message: string;
  type: 'error' | 'success' | 'info' | '';
}

// Event Handler Types
export type LoginHandler = (form: FormState) => Promise<void>;
export type RegisterHandler = (form: FormState) => Promise<void>;
export type LogoutHandler = () => void;
export type ToggleModeHandler = () => void;
