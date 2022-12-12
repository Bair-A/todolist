'use strict';

//variables
let taskForm = document.querySelector('.task-form'),
    taskInput = document.querySelector('.task-input'),
    taskBody = document.querySelector('.task-list'),
    idCounter = 0,
    taskObjArr;

initTodoList();

//functions
function getId() {
    return idCounter++
}
function initTodoList() {
    if (localStorage.getItem('todoList') == null) {
        taskObjArr = [];
        return;
    }
    taskObjArr = JSON.parse(localStorage.getItem('todoList'));
    taskObjArr.forEach((item) => {
        let checkedVariable = item.checked ? 'checked' : '';
        taskBody.innerHTML += `<li class='task-item'><label><input type="checkbox" ${checkedVariable}><span>${item.task}</span></label></li>`
    });
    console.log(taskObjArr)
}
function checkValidationTask(currentTask) {
    let result = taskObjArr.find((item) => item.task === currentTask);
    return currentTask === '' || currentTask.trim() === '' || !(result === undefined);
}

//listeners
taskForm.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-task')) {
        let currentTask = taskInput.value.trim();
        if (checkValidationTask(currentTask)) return;
        let taskObj = {
            task: currentTask,
            checked: false,
        }
        taskObjArr.push(taskObj);
        taskBody.innerHTML += `<li class='task-item'><label><input type="checkbox"><span>${taskObj.task}</span></label></li>`
        taskInput.value = '';
        localStorage.setItem('todoList', JSON.stringify(taskObjArr));
    }

    if (event.target.classList.contains('clear-task-list')) {
        localStorage.removeItem('todoList');
        taskObjArr = [];
        let liCollection = document.querySelectorAll('.task-item');
        liCollection.forEach(item => item.remove())
    }
})

taskBody.addEventListener('change', (event) => {
    let currentTask = event.target.nextElementSibling.innerText,
        taskObj = taskObjArr.find(item => {
            return item.task === currentTask;
        });
    taskObj.checked = !taskObj.checked;
    localStorage.setItem('todoList', JSON.stringify(taskObjArr));
    console.log(taskObj)
})