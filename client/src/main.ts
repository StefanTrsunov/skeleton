import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('app-root')
class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 1rem;
      text-align: center;
    }
  `;

  @state()
  private message = 'Loading...';

  connectedCallback() {
    super.connectedCallback();
    this.fetchMessage();
  }

  async fetchMessage() {
    try {
      const response = await fetch('http://localhost:8000/helloworld');
      if (!response.ok) {
        this.message = `Error: ${response.status}`;
        return;
      }
      this.message = await response.text();
    } catch (error) {
      this.message = `Fetch failed: ${error}`;
    }
  }

  render() {
    return html`<h1>${this.message}</h1>`;
  }
}
