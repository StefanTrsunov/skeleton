import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UserModel } from '../models/UserModel';
import { ApiService } from '../services/ApiService';
import { UserController } from '../controllers/UserController';
import { AppController } from '../controllers/AppController';
import { FormState, StatusState } from '../types';

// Import view components
import './LoginView';
import './ProfileView';

@customElement('app-view')
export class AppView extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 1rem;
      text-align: center;
      max-width: 400px;
      margin: 0 auto;
    }

    h1 {
      color: #333;
      margin-bottom: 2rem;
    }
  `;

  @state()
  private message = 'Loading...';

  @state()
  private form: FormState = {
    username: '',
    password: ''
  };

  @state()
  private status: StatusState = {
    message: '',
    type: ''
  };

  @state()
  private isRegisterMode = false;

  private userModel = new UserModel();
  private apiService = new ApiService();
  private userController: UserController;
  private appController: AppController;

  constructor() {
    super();
    this.userController = new UserController(
      this.userModel, 
      this.apiService, 
      () => this.requestUpdate()
    );
    this.appController = new AppController(
      this.apiService, 
      () => this.requestUpdate()
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadHelloMessage();
  }

  async loadHelloMessage() {
    this.message = await this.appController.loadHelloMessage();
    this.requestUpdate();
  }

  private setStatus(message: string, type: 'error' | 'success' | 'info' | '') {
    this.status = { message, type };
    this.requestUpdate();
  }

  private clearForm() {
    this.form = { username: '', password: '' };
    this.requestUpdate();
  }

  async handleLogin(form: FormState) {
    this.form = form;
    const result = await this.userController.login(form);
    this.setStatus(result.message, result.type);
    if (result.type === 'success') {
      this.clearForm();
    }
  }

  async handleRegister(form: FormState) {
    this.form = form;
    const result = await this.userController.register(form);
    this.setStatus(result.message, result.type);
    if (result.type === 'success') {
      this.clearForm();
      this.isRegisterMode = false;
      this.requestUpdate();
    }
  }

  handleLogout() {
    const result = this.userController.logout();
    this.setStatus(result.message, result.type);
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.setStatus('', '');
    this.clearForm();
  }

  render() {
    return html`
      <h1>${this.message}</h1>
      
      ${!this.userController.isAuthenticated() ? html`
        <login-view
          .form=${this.form}
          .status=${this.status}
          .isRegisterMode=${this.isRegisterMode}
          .onLogin=${(form: FormState) => this.handleLogin(form)}
          .onRegister=${(form: FormState) => this.handleRegister(form)}
          .onToggleMode=${() => this.toggleMode()}
        ></login-view>
      ` : html`
        <profile-view
          .user=${this.userController.getCurrentUser()}
          .onLogout=${() => this.handleLogout()}
        ></profile-view>
      `}
    `;
  }
}
