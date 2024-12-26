import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

@customElement('todo-app')
class TodoApp extends LitElement {
  @property({ attribute: false })
  todos: Todo[] = [];

  websocket: WebSocket | null = null;

  constructor() {
    super();
    this.fetchTodos();
    this.initWebSocket();
  }

  async fetchTodos() {
    try {
      // const response = await fetch(`http://localhost:8081/todos`);
      const response = await fetch(`http://192.168.196.186:8081/todos`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const todos = await response.json();
      this.todos = todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  initWebSocket() {
    console.log(window.location.hostname)
    // const response = await fetch(`http://localhost:8081/ws`);
    this.websocket = new WebSocket(`ws://192.168.196.186:8081/ws`);
    this.websocket.onmessage = (event) => {
      const newTodo = JSON.parse(event.data);
      this.todos = [...this.todos, newTodo];
    };
    this.websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  async addTodo(task: string) {
    try {
      // const response = await fetch(`http://localhost:8081/todos/add`);
      await fetch('http://192.168.196.186:8081/todos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    const taskInput = this.shadowRoot!.getElementById('task') as HTMLInputElement;
    if (taskInput) {
      this.addTodo(taskInput.value);
      taskInput.value = '';
    }
  }

  render() {
    return html`
      <h1>To-Do List</h1>
      <form @submit="${this.handleFormSubmit}">
        <input type="text" id="task" placeholder="New task" required>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        ${this.todos.map(todo => html`
          <!-- <li>${todo.task} - ${todo.completed ? 'Completed' : 'Not Completed'}</li> -->
          <li>${todo.task}</li> 
        `)}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-app': TodoApp;
  }
}
