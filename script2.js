//Creating constant variables for elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const pendingTasksNumb = document.querySelector(".pendingTasks");
var counter = 0;


//It was easier to just disable the add button than to send annoying alerts.
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value;
    if (userEnteredValue.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}
//adding checked-status for clicked tasks
var check = document.querySelector('ul');

check.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        counterUpdate();
        pendingTasksNumb.textContent = listArray.length - counter;
    }
}, false);

window.addEventListener('load', (event) => {
    var counter = document.getElementsByClassName('checked').length;
    console.log(counter);
});
setInterval(function() {
    counterPush();
    console.log(counter);
}, 1000);
//adding written task to the todo list
showTasks();
addBtn.onclick = () => {
    let userEnteredValue = inputBox.value;
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    listArray.push(userEnteredValue);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
    addBtn.classList.remove("active");
}
function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    // const pendingTasksNumb = document.querySelector(".pendingTasks");
    console.log(counter);
    var help = document.querySelectorAll('.checked').length;
    pendingTasksNumb.textContent = listArray.length - help;
    if (listArray.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}
//remove selected task
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    counterUpdate();
    counter--;
    showTasks();
}
//remove everything when clicking the clear all
deleteAllBtn.onclick = () => {
    listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    counter = 0;
    counterUpdate();
    location.reload();
    counterPush();
    showTasks();
}
function counterUpdate() {
    counter = document.getElementsByClassName('checked').length;
}
function counterPush() {
    pendingTasksNumb.textContent = listArray.length - counter;
}