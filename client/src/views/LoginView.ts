import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { UserController } from '../controllers/UserController';
import { ApiService } from '../services/ApiService';
import { FormState, StatusState, LoginHandler, RegisterHandler, ToggleModeHandler } from '../types';
@customElement('login-view')
export class LoginView extends LitElement {
  static styles = css`
    .login-form {
      margin: 2rem 0;
    }

    .form-group {
      margin: 1rem 0;
      text-align: left;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
    }

    button {
      background: #007cba;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      margin: 0.5rem;
    }

    button:hover {
      background: #005a87;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .message {
      margin: 1rem 0;
      padding: 0.5rem;
      border-radius: 4px;
    }

    .error {
      background: #fee;
      color: #c00;
      border: 1px solid #fcc;
    }

    .success {
      background: #efe;
      color: #060;
      border: 1px solid #cfc;
    }
  `;

  @property({ type: Object })
  form: FormState = { username: '', password: '' };

  @property({ type: Object })
  status: StatusState = { message: '', type: '' };

  @property({ type: Boolean })
  isRegisterMode = false;

  @property({ type: Function })
  onLogin?: LoginHandler;

  @property({ type: Function })
  onRegister?: RegisterHandler;

  @property({ type: Function })
  onToggleMode?: ToggleModeHandler;

  private onUsernameInput(e: Event) {
    this.form = {
      ...this.form,
      username: (e.target as HTMLInputElement).value
    };
    this.requestUpdate();
  }

  private onPasswordInput(e: Event) {
    this.form = {
      ...this.form,
      password: (e.target as HTMLInputElement).value
    };
    this.requestUpdate();
  }

  private handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  private async handleSubmit() {
    if (this.isRegisterMode) {
      await this.onRegister?.(this.form);
    } else {
      await this.onLogin?.(this.form);
    }
  }

  render() {
    return html`
      ${this.status.message ? html`
        <div class="message ${this.status.type}">
          ${this.status.message}
        </div>
      ` : ''}

      <div class="login-form">
        <h2>${this.isRegisterMode ? 'Register' : 'Login'}</h2>
        <div class="form-group">
          <label for="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            .value=${this.form.username}
            @input=${this.onUsernameInput}
            @keypress=${this.handleKeyPress}
            placeholder="Enter username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            .value=${this.form.password}
            @input=${this.onPasswordInput}
            @keypress=${this.handleKeyPress}
            placeholder="${this.isRegisterMode ? 'Password (min 6 characters)' : 'Enter password'}"
          />
        </div>
        <button @click=${this.handleSubmit}>
          ${this.isRegisterMode ? 'Register' : 'Login'}
        </button>
        <button @click=${this.onToggleMode}>
          ${this.isRegisterMode ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </div>
    `;
  }
}
