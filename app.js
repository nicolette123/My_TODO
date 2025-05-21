const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    allTodos.push(todoText);
    saveTodos();
    updateTodoList();
    todoInput.value = '';
  }
 else{
    alert("please enter a task");
 }
  
}

function updateTodoList() {
  todoListUL.innerHTML = '';
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  const todoId = 'todo-' + todoIndex;
  const todoLI = document.createElement('li');
  todoLI.className = 'todo';

  todoLI.innerHTML = `
    <input type="checkbox" id="${todoId}">
    <label for="${todoId}" class="custom-checkbox"></label>
    <label for="${todoId}" class="todo-text">${todo}</label>
    <button class="delete-button"><i class="fas fa-trash"></i></button>
  `;

  const deleteButton = todoLI.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    deleteTodoItem(todoIndex);
  });

  return todoLI;
}

function deleteTodoItem(index) {
  allTodos = allTodos.filter((_, i) => i !== index);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(allTodos));
}

function getTodos() {
  return JSON.parse(localStorage.getItem('todos') || '[]');
}
