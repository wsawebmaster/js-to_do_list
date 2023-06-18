const formAddTodo = document.querySelector(".form-add-todo");
const formSearch = document.querySelector(".form-search");
const todosContainer = document.querySelector(".todos-container");
const pForWarning = document.createElement("p");

const objectForW = {
  paragraph: pForWarning,
  text: "Digite ao menos 5 caracteres!",
  itemClass: "alert",
  insertA: formAddTodo,
};

const forTheWarning = (greatObject) => {
  const { paragraph, text, itemClass, insertA } = greatObject;
  (paragraph.textContent = text),
    paragraph.setAttribute("class", itemClass),
    insertA.insertAdjacentElement("afterend", paragraph);
};

const addTodo = (inputValue, e) => {
  if (inputValue.length >= 5) {
    todosContainer.innerHTML += `<li class="list-group-item bg-transparent d-flex justify-content-between align-items-center" data-todo="${inputValue}">
    <span class='todoMarginLeft'>${inputValue}</span>
    <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
    </li>`;
    e.target.reset();
    return;
  }
  forTheWarning(objectForW);
};

formAddTodo.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = e.target.add.value.trim();
  addTodo(inputValue, e);
});

formAddTodo.addEventListener("input", (e) => {
  if (pForWarning) {
    pForWarning.remove();
  }
});

const removeTodo = (inputValue) => {
  const trashDataValue = inputValue.dataset.trash;
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`);

  if (trashDataValue) {
    todo.remove();
  }
};

todosContainer.addEventListener("click", (e) => {
  const inputValue = e.target;
  removeTodo(inputValue);
});

const filterTodos = (todos, inputValue, returnMatchTodos) =>
  todos.filter((element) => {
    const matchTodos = element.textContent.toLowerCase().includes(inputValue);
    return returnMatchTodos ? matchTodos : !matchTodos;
  });

const manipulateClasses = (todos, classToAdd, classToRemove) => {
  todos.forEach((element) => {
    element.classList.remove(classToRemove);
    element.classList.add(classToAdd);
  });
};

const hideTodos = (todos, inputValue) => {
  const todosHideTodos = filterTodos(todos, inputValue, false);
  manipulateClasses(todosHideTodos, "hidden", "d-flex");
};

const showTodos = (todos, inputValue) => {
  const todosShowTodos = filterTodos(todos, inputValue, true);
  manipulateClasses(todosShowTodos, "d-flex", "hidden");
};

formSearch.addEventListener("input", (e) => {
  const inputValue = e.target.value.toLowerCase().trim();
  const todos = Array.from(todosContainer.children);

  hideTodos(todos, inputValue);
  showTodos(todos, inputValue);
});
