
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector('.filter-todo')

document.addEventListener("DOMContentLoaded" , getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)


function addTodo(event) {
    // prevent form from submitting
    event.preventDefault()
    // TodoDiv
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    //create LI
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    //add local
    saveLocalTodo(todoInput.value)
    //check mark btn
    const completeButton = document.createElement('button')
    completeButton.innerText = '<i class="fas fa-check"></i>'
    completeButton.classList.add('complete-btn')
    todoDiv.appendChild(completeButton)
    //check trash
    const trashButton = document.createElement('button')
    trashButton.innerText = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('complete-btn')
    todoDiv.appendChild(trashButton)
    //append to list
    todoList.appendChild(todoDiv)
    //clear todoInput
    todoInput.value = ''
}

function deleteCheck(e) {
    const item = e.target;
    //delete
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement
        removeLocal(todo)
        todo.remove()
    }

    //check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                break;
            case  "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (todo.classList.contains("uncompleted")) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
        }
    });
}

function saveLocalTodo(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")
        //create LI
        const newTodo = document.createElement("li")
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo)
        //check mark btn
        const completeButton = document.createElement('button')
        completeButton.innerText = '<i class="fas fa-check"></i>'
        completeButton.classList.add('complete-btn')
        todoDiv.appendChild(completeButton)
        //check trash
        const trashButton = document.createElement('button')
        trashButton.innerText = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('complete-btn')
        todoDiv.appendChild(trashButton)
        //append to list
        todoList.appendChild(todoDiv)
    })
}

function removeLocal(todo){
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerHTML
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem('todos',JSON.stringify(todos))
}
