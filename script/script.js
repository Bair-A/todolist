'use strict';

//const and variables
const taskForm = document.querySelector('.task-form');
const taskInput = document.querySelector('.task-input');
const taskBody = document.querySelector('.task-list');
const TASK_LIST_KEY = 'todoList';
const COUNTER_KEY = 'idCounter';

let idCounter = 0;
let taskObjArr = [];

//functions
function saveLocalStorage() {
    localStorage.setItem(TASK_LIST_KEY, JSON.stringify(taskObjArr));
    localStorage.setItem(COUNTER_KEY, idCounter);
}

function getTaskList() {
    const data = localStorage.getItem(TASK_LIST_KEY);
    return data ? JSON.parse(data) : null;
}

function getId() {
    return idCounter++;
}

function initTodoList() {
    if (!getTaskList()) return;

    taskObjArr = getTaskList();
    taskObjArr.forEach((item) => {
        const checkedVariable = item.checked ? 'checked' : '';
        taskBody.innerHTML += `<li class='task-item' id="${item.id}">
                                    <input type="checkbox" ${checkedVariable}>
                                    <span class="task-text" contenteditable="true">${item.task}</span>
                                    <div class="cross-body"><span></span></div>
                               </li>`;
    });
    idCounter = +localStorage.getItem(COUNTER_KEY);
}

function validationTask(currentTask) {
    return !(currentTask.trim() === '');
}

function handlerFormButtonsClick(event) {
    if (event.target.classList.contains('add-task')) {
        let currentTask = taskInput.value.trim();
        if (!validationTask(currentTask)) return;
        const taskObj = {
            task: currentTask,
            checked: false,
            id: getId(),
        }
        taskObjArr.push(taskObj);
        taskBody.innerHTML += `<li class='task-item' id="${taskObj.id}">
                                    <input type="checkbox">
                                    <span class="task-text" contenteditable="true">${taskObj.task}</span>
                                    <div class="cross-body"><span></span></div>
                               </li>`
        taskInput.value = '';
        saveLocalStorage();
    }

    if (event.target.classList.contains('clear-task-list')) {
        localStorage.removeItem(TASK_LIST_KEY);
        taskObjArr = [];
        const liCollection = document.querySelectorAll('.task-item');
        liCollection.forEach(item => item.remove());
        idCounter = 0;
    }
}

function handlerChangeCheckbox(event) {
    if (event.target.tagName === 'INPUT') {
        const currentTaskId = +event.target.closest('li').id;
        const taskObj = taskObjArr.find(item => item.id === currentTaskId);

        taskObj.checked = !taskObj.checked;

        if (taskObj.checked) {
            event.target.setAttribute('checked', 'checked');
        } else {
            event.target.removeAttribute('checked');
        }

        saveLocalStorage();
    }
}

function handlerChangeText(event) {
    if (event.target.tagName === 'INPUT') return;

    const currentTaskId = +event.target.closest('li').id;
    const taskObj = taskObjArr.find(item => item.id === currentTaskId);

    taskObj.task = event.target.innerHTML;
    saveLocalStorage();
}

function handlerRemoveTask(event) {
    if (event.target.classList.contains('cross-body')) {
        const currentTask = event.target.closest('li');
        const currentTaskId = +currentTask.id;
        const objIndex = taskObjArr.findIndex(item => item.id === currentTaskId);

        currentTask.remove();
        taskObjArr.splice(objIndex, 1);
        saveLocalStorage();
    }
}
//code
initTodoList();

//listeners
taskForm.addEventListener('click', handlerFormButtonsClick);

taskBody.addEventListener('change', handlerChangeCheckbox)

taskBody.addEventListener('input', handlerChangeText)

taskBody.addEventListener('click', handlerRemoveTask)

