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
        taskBody.innerHTML += `<li class='task-item'><input type="checkbox" ${checkedVariable}><span contenteditable="true">${item.task}</span></li>`
    });
    idCounter = +JSON.parse(localStorage.getItem('idCounter'));
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
            id: getId(),
        }
        taskObjArr.push(taskObj);
        taskBody.innerHTML += `<li class='task-item' id="${taskObj.id}"><input type="checkbox"><span contenteditable="true">${taskObj.task}</span></li>`
        taskInput.value = '';
        localStorage.setItem('todoList', JSON.stringify(taskObjArr));
        localStorage.setItem('idCounter', JSON.stringify(idCounter));
        console.log(taskObj)
    }

    if (event.target.classList.contains('clear-task-list')) {
        localStorage.removeItem('todoList');
        taskObjArr = [];
        let liCollection = document.querySelectorAll('.task-item');
        liCollection.forEach(item => item.remove());
        idCounter = 0;
    }
})

taskBody.addEventListener('change', (event) => {
    if (event.target.tagName === 'INPUT') {
        let currentTaskId = +event.target.closest('li').id,
            taskObj = taskObjArr.find(item => {
                return item.id === currentTaskId;
            });
        taskObj.checked = !taskObj.checked;
        localStorage.setItem('todoList', JSON.stringify(taskObjArr));
    }
})
taskBody.addEventListener('input', (event) => {
    let currentTaskId = +event.target.closest('li').id,
        taskObj = taskObjArr.find(item => {
            return item.id === currentTaskId;
        });
    taskObj.task = event.target.innerHTML;
    localStorage.setItem('todoList', JSON.stringify(taskObjArr));
    console.log(taskObj.id)
})