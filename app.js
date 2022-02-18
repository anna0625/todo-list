// ========== Selectors ========== //
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// ========== Event Listeners ========== //
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

     // Clear Todo Input Value
     todoInput.value = "";

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
   
}

function deleteCheck(e){
    const item = e.target;

    // DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
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
    
}