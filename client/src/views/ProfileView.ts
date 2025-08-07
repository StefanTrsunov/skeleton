import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { User, LogoutHandler } from '../types';

@customElement('profile-view')
export class ProfileView extends LitElement {
  static styles = css`
    .profile {
      margin: 2rem 0;
      padding: 1rem;
      background: #f0f0f0;
      border-radius: 4px;
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

    h2 {
      margin-top: 0;
    }

    p {
      margin: 0.5rem 0;
    }
  `;

  @property({ type: Object })
  user?: User;

  @property({ type: Function })
  onLogout?: () => void;

  render() {
    if (!this.user) {
      return html`<div>No user data available</div>`;
    }

    return html`
      <div class="profile">
        <h2>Welcome, ${this.user.username}!</h2>
        <p>You are successfully authenticated.</p>
        <p><strong>User ID:</strong> ${this.user.id}</p>
        <button @click=${this.onLogout}>Logout</button>
      </div>
    `;
  }
}
