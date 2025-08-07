import { FormState, LoginResponse, RegisterResponse, HelloWorldResponse } from '../types';

export class ApiService {
  private baseUrl: string = 'http://localhost:8000';

  async login(form: FormState): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: `Login error: ${error}` };
    }
  }

  async register(form: FormState): Promise<RegisterResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: RegisterResponse = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: `Registration error: ${error}` };
    }
  }

  async getUserById(userId: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: `Get user error: ${error}` };
    }
  }

  async getHelloWorld(): Promise<HelloWorldResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/hello`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { message: data.message || 'Hello from API!' };
    } catch (error) {
      return { message: `Fetch failed: ${error}` };
    }
  }
}
