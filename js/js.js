//** DarkMod **//
function LightToDark() {
    document.documentElement.style.setProperty('--box-color', '#25273D');
    document.documentElement.style.setProperty('--main-color', '#171823');
    document.documentElement.style.setProperty('--text-color', '#fff');
    document.documentElement.style.setProperty('--border-color', '#393A4B');
    document.querySelector(".LBack-ground").style.backgroundImage = "url(\"../img/bg-desktop-dark.jpg\")"
    document.querySelector(".DChangeMod").style.display = "flex"
    document.querySelector(".LChangeMod").style.display = "none"
}

function DarkToLight() {
    document.documentElement.style.setProperty('--box-color', '#fff');
    document.documentElement.style.setProperty('--main-color', '#fff');
    document.documentElement.style.setProperty('--text-color', '#494C6B');
    document.documentElement.style.setProperty('--border-color', '#e3e4f1');
    document.querySelector(".LBack-ground").style.backgroundImage = "url(\"../img/bg-desktop-light.jpg\")"
    document.querySelector(".DChangeMod").style.display = "none"
    document.querySelector(".LChangeMod").style.display = "flex"
}

//** App **//
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterAll = document.getElementById('all')
const filterActive = document.getElementById('active')
const filterCompleted = document.getElementById('completed')
const reset = document.getElementById('clear')
let todos


document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener('click', addTodo)
todoInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        addTodo(event)
    }
})
filterAll.addEventListener('click', allFilter)
filterActive.addEventListener('click', activeFilter)
filterCompleted.addEventListener('click', completedFilter)
reset.addEventListener("click", Reset)

function addTodo(event) {
    // prevent form from submitting
    event.preventDefault()
    // TodoDiv
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("box1")
    todoDiv.classList.add("theme")
    //sideDiv
    const sideDiv1 = document.createElement("div")
    const sideDiv2 = document.createElement("div")
    sideDiv2.classList.add("list")
    sideDiv2.classList.add("theme")
    todoDiv.appendChild(sideDiv1)
    todoDiv.appendChild(sideDiv2)
    //checkBox
    const checkBox = document.createElement("div")
    checkBox.addEventListener('click', chickOut)
    checkBox.classList.add("circle")
    sideDiv1.appendChild(checkBox)
    const imgBox = document.createElement("img")
    imgBox.src = "../img/icon-check.svg"
    imgBox.classList.add("check")
    checkBox.appendChild(imgBox)
    //create name
    const newTodo = document.createElement("p")
    newTodo.innerText = todoInput.value
    newTodo.classList.add("theme")
    newTodo.classList.add("paragraph")
    sideDiv2.appendChild(newTodo)
    //trashTodo
    const trash = document.createElement("img")
    trash.addEventListener('click', deleteCheck)
    trash.src = "../img/icon-cross.svg"
    trash.classList.add("delete")
    sideDiv2.appendChild(trash)
    //add local
    saveLocalTodo(todoInput.value)
    //append to list
    todoList.appendChild(todoDiv)
    //clear todoInput
    todoInput.value = ''
    HowManyItems()
    allFilter()
}

//delete
function deleteCheck(e) {
    const item = e.target.parentElement.parentElement;
    removeLocal(item)
    item.remove()
    HowManyItems()
}

//check
function chickOut(e) {
    const item = e.target;
    const check = item.firstChild
    const text = item.parentElement.parentElement.lastChild.firstChild
    check.classList.toggle("Check")
    item.classList.toggle("circleCheck")
    text.classList.toggle("paragraphCheck")
    HowManyItems()
}

function saveLocalTodo(todo) {
    // let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    // let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("box1")
        todoDiv.classList.add("theme")
        //sideDiv
        const sideDiv1 = document.createElement("div")
        const sideDiv2 = document.createElement("div")
        sideDiv2.classList.add("list")
        sideDiv2.classList.add("theme")
        todoDiv.appendChild(sideDiv1)
        todoDiv.appendChild(sideDiv2)
        //checkBox
        const checkBox = document.createElement("div")
        checkBox.addEventListener('click', chickOut)
        checkBox.classList.add("circle")
        sideDiv1.appendChild(checkBox)
        const imgBox = document.createElement("img")
        imgBox.src = "../img/icon-check.svg"
        imgBox.classList.add("check")
        checkBox.appendChild(imgBox)
        //create name
        const newTodo = document.createElement("p")
        newTodo.innerText = todo
        newTodo.classList.add("theme")
        newTodo.classList.add("paragraph")
        sideDiv2.appendChild(newTodo)
        //trashTodo
        const trash = document.createElement("img")
        trash.addEventListener('click', deleteCheck)
        trash.src = "../img/icon-cross.svg"
        trash.classList.add("delete")
        sideDiv2.appendChild(trash)
        //append to list
        todoList.appendChild(todoDiv)
    })
    HowManyItems()
    allFilter()
}

function removeLocal(todo, index) {
    // let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const text = todo.lastChild
    const todoIndex = text.children[0].innerHTML
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function HowManyItems() {
    const unComplete = document.getElementsByClassName('paragraph')
    const Complete = document.getElementsByClassName('paragraphCheck')
    const pTag = document.getElementById("many")
    pTag.innerText = `${unComplete.length - Complete.length} item(s) left`
}

function allFilter() {
    const divAll = document.getElementsByClassName("box1")
    for (let i = 0; divAll.length > i; i++) {
        divAll[i].style.display = "flex"
    }
    filterAll.style.color = "#3a7cfd"
    filterActive.style.color = "#9495a5"
    filterCompleted.style.color = "#9495a5"
}

function activeFilter() {
    const divAll = document.getElementsByClassName("box1")
    for (let i = 0; divAll.length > i; i++) {
        const divComplete = divAll[i].firstChild.firstChild
        if (divComplete.classList.contains("circleCheck")) {
            divAll[i].style.display = "none"
        } else {
            divAll[i].style.display = "flex"
        }
    }
    filterAll.style.color = "#9495a5"
    filterActive.style.color = "#3a7cfd"
    filterCompleted.style.color = "#9495a5"
}

function completedFilter() {
    const divAll = document.getElementsByClassName("box1")
    for (let i = 0; divAll.length > i; i++) {
        const divComplete = divAll[i].firstChild.firstChild
        if (!(divComplete.classList.contains("circleCheck"))) {
            divAll[i].style.display = "none"
        } else {
            divAll[i].style.display = "flex"
        }
    }
    filterAll.style.color = "#9495a5"
    filterActive.style.color = "#9495a5"
    filterCompleted.style.color = "#3a7cfd"
}

// function Reset() {
//     removeLocal('',true)
// }
