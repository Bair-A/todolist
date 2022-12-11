'use strict';

//variables
let taskForm = document.querySelector('.task-form'),
    taskInput = document.querySelector('.task-input'),
    taskBody = document.querySelector('.task-list'),
    taskObjArr;

    initTodoList();

//functions
function initTodoList() {
    if (localStorage.getItem('todoList') == null) {
        taskObjArr = [];
        return;
    }
    taskObjArr = JSON.parse(localStorage.getItem('todoList'));
    taskObjArr.forEach((item) => taskBody.innerHTML += `<li class='task-item'><label><input type="checkbox"><span>${item.task}</span></label></li>`);
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
        }
        taskObjArr.push(taskObj);
        taskBody.innerHTML += `<li class='task-item'><label><input type="checkbox"><span>${taskObj.task}</span></label></li>`
        taskInput.value = '';
    }
    if (event.target.classList.contains('save-task')) {
        localStorage.setItem('todoList', JSON.stringify(taskObjArr));
    }
    if (event.target.classList.contains('clear-task-list')) {
        localStorage.removeItem('todoList');
        taskObjArr = [];
        let liCollection = document.querySelectorAll('.task-item');
        liCollection.forEach(item => item.remove())
    }
})

