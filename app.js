// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  // Prevent form from subbmitting
  event.preventDefault();

  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create li
  //  <li class="todo-item">hey</li>
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // save todo to localstorage
  saveLocalTodos(todoInput.value);

  // chechmark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></>';
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);

  // trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  // append all to the todo-list
  todoList.appendChild(todoDiv);

  // clear input box
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;
  // console.log(item);
  // delete item
  if (item.classList[0] === "trash-button") {
    // console.log(item.classList[0]);
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeTodoFromLocalStorage(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // check item
  if (item.classList[0] === "complete-button") {
    // console.log(item.classList[0]);
    item.parentElement.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  // console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // check---do already have thingd there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // check---do already have thingd there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    //  <li class="todo-item">hey</li>
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // chechmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></>';
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);

    // trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    // append all to the todo-list
    todoList.appendChild(todoDiv);
  });
}

function removeTodoFromLocalStorage(todo) {
  // check---do already have thingd there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoToDelete = todo.firstChild.innerText;
  const todoIndex = todos.indexOf(todoToDelete);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
