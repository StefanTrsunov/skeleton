import { User } from '../types';

export class UserModel {
  public id?: number;
  public username?: string;
  public isAuthenticated: boolean = false;

  constructor() {
    this.reset();
  }

  setUser(user: User): void {
    this.id = user.id;
    this.username = user.username;
    this.isAuthenticated = true;
  }

  reset(): void {
    this.id = undefined;
    this.username = undefined;
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated && !!this.id && !!this.username;
  }

  getUserInfo(): User | null {
    if (!this.isLoggedIn()) {
      return null;
    }
    return {
      id: this.id!,
      username: this.username!
    };
  }
}
