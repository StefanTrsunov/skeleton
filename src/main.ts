import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

@customElement('todo-app')
class TodoApp extends LitElement {
  @property({ type: Array })
  todos: Todo[] = [];

  constructor() {
    super();
    this.fetchTodos();
  }

  async fetchTodos() {
    try {
      const response = await fetch('http://localhost:8081/todos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const todos = await response.json();
      this.todos = todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  async addTodo(task: string) {
    try {
      await fetch('http://localhost:8081/todos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
      this.fetchTodos(); // Refresh the list
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    const taskInput = this.shadowRoot?.getElementById('task') as HTMLInputElement;
    if (taskInput) {
      this.addTodo(taskInput.value);
      taskInput.value = ''; // Clear input field
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
          <li>${todo.task} - ${todo.completed ? 'Completed' : 'Not Completed'}</li>
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
