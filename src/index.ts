import "./styles.css";

// Store
const todos: string[] = [];
const completedTodos: string[] = [];

// Base Elements
const inputEl: HTMLInputElement | null = document.getElementById(
  "add-todo-input"
) as HTMLInputElement | null;

const todoItemsEl: HTMLUListElement | null = document.getElementById(
  "todo-items"
) as HTMLUListElement | null;

const completedItemsEl: HTMLUListElement | null = document.getElementById(
  "completed-items"
) as HTMLUListElement | null;

// Render todos
function renderTodos(): void {
  if (!todoItemsEl) {
    return;
  }
  todoItemsEl.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const todoEl = document.createElement("li");
    todoEl.textContent = todo;
    todoEl.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      todos.splice(i, 1);
      completedTodos.push(todo);
      renderTodos();
      renderCompleted();
    });
    todoItemsEl.appendChild(todoEl);
  }
}

// Render completed todos
function renderCompleted(): void {
  if (!completedItemsEl) {
    return;
  }
  completedItemsEl.innerHTML = "";
  for (let i = 0; i < completedTodos.length; i++) {
    const completedTodo = completedTodos[i];
    const completedTodoEl = document.createElement("li");
    completedTodoEl.textContent = completedTodo;
    completedTodoEl.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      completedTodos.splice(i, 1);
      todos.push(completedTodo);
      renderTodos();
      renderCompleted();
    });
    completedItemsEl.appendChild(completedTodoEl);
  }
}

// Apply new todo add
if (inputEl) {
  inputEl.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter" && inputEl.value.trim() !== "") {
      todos.push(inputEl.value.trim());
      inputEl.value = "";
      renderTodos();
    }
  });
}

// init
renderTodos();
renderCompleted();
