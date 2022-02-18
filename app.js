// ========== Selectors ========== //
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// ========== Event Listeners ========== //
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// ========== Functions ========== //
function addTodo(event){
    // Prevent form from submiting
    event.preventDefault();

    // Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // Create list
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Add TODO to LocalStorage
    saveLocalTodos(todoInput.value);

    // Check Mark Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // Check trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append todoDiv to todoList
    todoList.appendChild(todoDiv);

    // Clear Todo Input Value
    todoInput.value = "";
   
}

function deleteCheck(e){
    const item = e.target;

    // DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        // Delete from localStorage
        removeLocalTodos(todo);
        // After completing transition style, todo will be removed
        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
        
    }

    // CHECK MARK
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    // console.log(todos);
    // to check each todo in todos
    todos.forEach(function(todo){
        // console.log(todo);
         switch(e.target.value){
             case "all":
                todo.style.display = 'flex';
                //  console.log('all is here.');
                 break;
             case "completed":
                 if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                    // console.log('display completed');
                 }else{
                     todo.style.display = 'none';
                 }
                 break;
             case "uncompleted":
                 if(!todo.classList.contains('completed')){
                     todo.style.display = "flex";
                 }else{
                     todo.style.display = 'none';
                 }
                //  break;
         }
     });
}

// Here is gonna recive a todo
function saveLocalTodos(todo){
    // Check --- Do I already have thing in there
    let todos;
    // todos is the key, and we try to get the values of it
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    // Check --- Do I already have thing in there
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
     }

    // To show up the UI of todo-list again from localStorage
    todos.forEach(function(todo){
        // Create todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        // Create list
        const newTodo = document.createElement('li');
        newTodo.innerText = todo; //change todoInput.value -> todo
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Check Mark Button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        // Check trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append todoDiv to todoList
        todoList.appendChild(todoDiv);
    
    });
}

function removeLocalTodos(todo){
    // Check - Do we already have thing in there?
    let todos;
    // todos is the key, and we try to get the values of it
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1); 
    localStorage.setItem("todos", JSON.stringify(todos));
}