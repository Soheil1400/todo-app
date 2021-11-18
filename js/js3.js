//element
const todoBoxes = document.getElementsByClassName("todo-list")[0]
const todoDiv = document.getElementsByClassName('box1')
const todoInput = document.getElementsByClassName("todo-input")[0]
const filterAll = document.getElementById('all')
const filterActive = document.getElementById('active')
const filterCompleted = document.getElementById('completed')
const reset = document.getElementById("reset")
const pTag = document.getElementById("many")
let todos = []
let mods = []
// ** DarkMod **//
function LightToDark() {
    document.documentElement.style.setProperty('--box-color', '#25273D');
    document.documentElement.style.setProperty('--main-color', '#171823');
    document.documentElement.style.setProperty('--text-color', '#fff');
    document.documentElement.style.setProperty('--border-color', '#393A4B');
    document.querySelector(".LBack-ground").style.backgroundImage = "url(\"../img/bg-desktop-dark.jpg\")"
    document.querySelector(".DChangeMod").style.display = "flex"
    document.querySelector(".LChangeMod").style.display = "none"
    return (mods = [true],
        saveMod())
}
function DarkToLight() {
    document.documentElement.style.setProperty('--box-color', '#fff');
    document.documentElement.style.setProperty('--main-color', '#fff');
    document.documentElement.style.setProperty('--text-color', '#494C6B');
    document.documentElement.style.setProperty('--border-color', '#e3e4f1');
    document.querySelector(".LBack-ground").style.backgroundImage = "url(\"../img/bg-desktop-light.jpg\")"
    document.querySelector(".DChangeMod").style.display = "none"
    document.querySelector(".LChangeMod").style.display = "flex"
    return (mods = [false],
        saveMod())
}
//** App **//
//event
reset.addEventListener("click", clear)
todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleInput(event)
        todoInput.value = ""
    }
})
//BuildToDo
function addTodo(obj) {
    return (`<div class="box1 theme">
                <div>
                    <div onclick="checked('${obj.name}')" class="circle">
                        <img src="../img/icon-check.svg" class="check" alt="check">
                    </div>
                </div>
                <div class="list theme">
                    <p class="theme paragraph">${obj.name}</p>
                    <img src="../img/icon-cross.svg" class="delete" onclick="remove('${obj.name}')" alt="trash">
                </div>
                </div>
    `)
}
//generate
const generateList = (arrInfo) => {
    return (arrInfo.map((item) => {
        return (addTodo(item))
    })).join(" ")
}

function handleInput(event) {
    let createObj = {name: "", state: false}
    createObj.name = event.target.value;
    return (
        todos.push(createObj),
            todoBoxes.innerHTML = generateList(todos),
            saveLocal(todos)
    )
}

function checked(element) {
    for (let item of todos) {
        if (item.name === element) {
            if (item.state === false) {
                item.state = true
                return saveLocal(todos)
            } else {
                item.state = false
                return saveLocal(todos)
            }
        }
    }
}

function checkStyle(obj) {
    for (let item of obj) {
        const check = document.getElementsByClassName('check')[obj.indexOf(item)]
        const text = document.getElementsByClassName('paragraph')[obj.indexOf(item)]
        const color = document.getElementsByClassName('circle')[obj.indexOf(item) + 1]
        if (item.state === true) {
            check.classList.add('Check')
            color.classList.add('circleCheck')
            text.classList.add('paragraphCheck')
        } else {
            check.classList.remove('Check')
            color.classList.remove('circleCheck')
            text.classList.remove('paragraphCheck')
        }
    }
}
//How many items left
function HowManyItems() {
    let number = 0
    for (let item of todos) {
        if (item.state === false) {
            number++
        }
    }
    pTag.innerText = `${number} item(s) left`
}
//filterAll
function allFilter() {
    todoBoxes.innerHTML = generateList(todos)
    checkStyle(todos)
    filterAll.classList.add('doneClass')
    filterActive.classList.remove('doneClass')
    filterCompleted.classList.remove('doneClass')
}
//filterActive
function activeFilter() {
    for (let i = 0;todos.length > i; i++){
        todoDiv[i].style.display = 'flex'
    }
    for (let item of todos) {
        if (item.state === true) {
            todoDiv[todos.indexOf(item)].style.display = 'none'

        }
    }
    filterAll.classList.remove('doneClass')
    filterActive.classList.add('doneClass')
    filterCompleted.classList.remove('doneClass')
}
//filterCompleted
function completedFilter() {
    for (let i = 0;todos.length > i; i++){
        todoDiv[i].style.display = 'flex'
    }
    for (let item of todos) {
        if (item.state === false) {
            todoDiv[todos.indexOf(item)].style.display = 'none'
        }
    }
    filterAll.classList.remove('doneClass')
    filterActive.classList.remove('doneClass')
    filterCompleted.classList.add('doneClass')
}
//clearCompleted
function clear() {
    todos = JSON.parse(localStorage.getItem("todos"))
    let fixArr = []
    for (let item of todos){
        if (item.state === false){
            fixArr.push(item)
        }
    }
    todos = fixArr
    localStorage.setItem('todos', JSON.stringify(todos))
    todoBoxes.innerHTML = generateList(todos)
    allFilter()
    HowManyItems(todos)
}
//saveLocal
function saveLocal() {
    fixSection()
    localStorage.setItem('todos', JSON.stringify(todos))
    HowManyItems()
    checkStyle(todos)
}
//refreshPage
function refresh() {
    todos = JSON.parse(localStorage.getItem("todos"))
    mods = JSON.parse(localStorage.getItem("mods"))
    todoBoxes.innerHTML = generateList(todos)
    HowManyItems()
    allFilter()
    checkStyle(todos)
}
//deleteItem
function remove(element) {
    todos = JSON.parse(localStorage.getItem("todos"))
    for (let item of todos) {
        if (item.name === element) {
            todos.splice(todos.indexOf(item), 1)
        }
    }
    localStorage.setItem('todos', JSON.stringify(todos))
    mods = JSON.parse(localStorage.getItem("mods"))
    todoBoxes.innerHTML = generateList(todos)
    HowManyItems()
    checkStyle(todos)
}
//saveMods
function saveMod() {
    localStorage.setItem('mods', JSON.stringify(mods))
}
//refreshMods
function refreshMod() {
    mods = JSON.parse(localStorage.getItem("mods"))
    console.log(mods)
    if (mods[0] === true) {
        LightToDark()
    }else {
        DarkToLight()
    }
}
//fixChangeItemInFilter
function fixSection(){
    if (filterAll.classList.contains('doneClass')){
        return allFilter()
    }if (filterActive.classList.contains('doneClass')) {
        return activeFilter()
    }if (filterCompleted.classList.contains('doneClass')){
        return completedFilter()
    }
}
//dragAndDrop
new Sortable(todoBoxes,{
    animation:350,
    dragClass: 'sortable-drag'
});
//fixFunction
refresh()
refreshMod()
fixSection()

