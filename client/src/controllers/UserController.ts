import { UserModel } from '../models/UserModel';
import { ApiService } from '../services/ApiService';
import { AppView } from '../views/AppView';
import { ProfileView } from '../views/ProfileView';
import { FormState, StatusState, LoginResponse } from '../types';

export class UserController {
  private userModel: UserModel;
  private apiService: ApiService;
  private onStateChange: () => void;

  constructor(userModel: UserModel, apiService: ApiService, onStateChange: () => void) {
    this.userModel = userModel;
    this.apiService = apiService;
    this.onStateChange = onStateChange;
  }

  async login(form: FormState): Promise<StatusState> {
    const validationResult = this.validateForm(form);
    if (!validationResult.success) {
      return { message: validationResult.message, type: 'error' };
    }

    const result = await this.apiService.login(form);
    
    if (result.success && result.user) {
      this.userModel.setUser(result.user);
      this.onStateChange();
      return { message: result.message, type: 'success' };
    } else {
      return { message: result.message || 'Login failed', type: 'error' };
    }
  }

  async register(form: FormState): Promise<StatusState> {
    const validationResult = this.validateForm(form);
    if (!validationResult.success) {
      return { message: validationResult.message, type: 'error' };
    }

    const passwordValidation = this.validatePasswordLength(form.password);
    if (!passwordValidation.success) {
      return { message: passwordValidation.message, type: 'error' };
    }

    const result = await this.apiService.register(form);
    
    if (result.success && result.user) {
      this.userModel.setUser(result.user);
      this.onStateChange();
      return { message: result.message, type: 'success' };
    } else {
      return { message: result.message || 'Registration failed', type: 'error' };
    }
  }

  logout(): StatusState {
    this.userModel.reset();
    this.onStateChange();
    return { message: 'Logged out successfully', type: 'success' };
  }

  async getUserById(userId: string): Promise<LoginResponse> {
    return await this.apiService.getUserById(userId);
  }

  isAuthenticated(): boolean {
    return this.userModel.isAuthenticated;
  }

  getCurrentUser() {
    return this.userModel.getUserInfo();
  }

  private validateForm(form: FormState): { success: boolean; message: string } {
    if (!form.username || !form.password) {
      return { success: false, message: 'Please enter both username and password' };
    }
    return { success: true, message: '' };
  }

  private validatePasswordLength(password: string): { success: boolean; message: string } {
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }
    return { success: true, message: '' };
  }
}
