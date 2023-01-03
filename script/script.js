'use strict';

//const and variables
const taskInputTitle = document.querySelector('.task-title-input');
const taskInputDescription = document.querySelector('.task-description-input');
const taskBody = document.querySelector('.task-list');
const taskAddBtn = document.querySelector('.main__add-btn');
const taskFormWrapper = document.querySelector('.task-form-wrapper');
const taskAddForm = document.querySelector('.add-task-form');
const clearFields = document.querySelectorAll('.clear-field');
const deleteAllTasks = document.querySelector('.delete-all-tasks');
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
    const localStorageTaskObjArr = localStorage.getItem(TASK_LIST_KEY);
    return localStorageTaskObjArr ? JSON.parse(localStorageTaskObjArr) : null;
}

function getId() {
    return idCounter++;
}

function initTodoList() {
    if (!getTaskList()) return;

    taskObjArr = getTaskList();
    taskObjArr.forEach((item) => {
        taskBody.innerHTML += `<li class='task-item' id="${item.id}">
                                    <div class="task-item-inner">
                                        <div class="checkbox checked">
                                        </div>
                                        <span class="task-text">${item.taskTitle}</span>
                                    </div>
                                    <button class="pencil">
                                        <img class="icon-pencil" src="./src/icons/pencil-icon.svg" alt="pencil-icon">
                                    </button>
                                    <button class="trash-can">
                                        <img class="icon-trash-can-close" src="./src/icons/trash-can-icon.svg" alt="trash-can-icon">
                                        <img class="icon-trash-can-open" src="./src/icons/trash-can-open-icon.svg" alt="trash-can-open-icon">
                                    </button>
                               </li>`;
    });
    idCounter = +localStorage.getItem(COUNTER_KEY);
}

function validateTask(currentTask) {
    return !(currentTask.trim() === '');
}

function clearCollectionFields() {
    clearFields.forEach(item => item.value = '')
}

function checkClickOutsideForm(event) {
    return !event.target.closest('.task-form');
}

function checkPressEsc(event) {
    return (event.code === 'Escape')
}

function checkClickCancelBtn(event) {
   return !!event.target.closest('.cancel-btn')
}

function closeModal() {
    taskFormWrapper.classList.remove('active');
    taskAddForm.classList.remove('active');
    removeModalListeners();
    clearCollectionFields();
}

function hendlerCloseModal(event) {
    if (checkClickOutsideForm(event) || checkClickCancelBtn(event) || checkPressEsc(event)) closeModal();
}

function hendlerAddTask(event) {
    if (event.target.classList.contains('add-task-btn')) {
        let currentTask = taskInputTitle.value.trim();
        let currentTaskDescription = taskInputDescription.value.trim();
        if (!validateTask(currentTask)) return;
        const taskObj = {
            taskTitle: currentTask,
            taskDescription: currentTaskDescription,
            checked: false,
            id: getId(),
        }
        taskObjArr.push(taskObj);
        taskBody.innerHTML += `<li class='task-item' id="${taskObj.id}">
                                    <div class="task-item-inner">
                                        <div class="checkbox checked">
                                        </div>
                                        <span class="task-text">${taskObj.taskTitle}</span>
                                    </div>
                                    <button class="pencil">
                                        <img class="icon-pencil" src="./src/icons/pencil-icon.svg" alt="pencil-icon">
                                    </button>
                                    <button class="trash-can">
                                        <img class="icon-trash-can-close" src="./src/icons/trash-can-icon.svg" alt="trash-can-icon">
                                        <img class="icon-trash-can-open" src="./src/icons/trash-can-open-icon.svg" alt="trash-can-open-icon">
                                    </button>
                               </li>`;
        saveLocalStorage();
        closeModal();
    }
}

// function handlerChangeCheckbox(event) {
//     if (event.target.tagName === 'INPUT') {
//         const currentTaskId = +event.target.closest('li').id;
//         const taskObj = taskObjArr.find(item => item.id === currentTaskId);
//
//         taskObj.checked = !taskObj.checked;
//
//         if (taskObj.checked) {
//             event.target.setAttribute('checked', 'checked');
//         } else {
//             event.target.removeAttribute('checked');
//         }
//
//         saveLocalStorage();
//     }
// }

// function handlerChangeText(event) {
//     if (event.target.tagName === 'INPUT') return;
//
//     const currentTaskId = +event.target.closest('li').id;
//     const taskObj = taskObjArr.find(item => item.id === currentTaskId);
//     console.log(currentTaskId);
//     taskObj.task = event.target.innerHTML;
//     saveLocalStorage();
// }

function handlerRemoveAllTaks() {
    localStorage.removeItem(TASK_LIST_KEY);
    taskObjArr = [];
    const liCollection = document.querySelectorAll('.task-item');
    liCollection.forEach(item => item.remove());
    idCounter = 0;
}

function handlerRemoveTask(event) {
    if (event.target.classList.contains('trash-can')) {
        const currentTask = event.target.closest('li');
        const currentTaskId = +currentTask.id;
        const objIndex = taskObjArr.findIndex(item => item.id === currentTaskId);
        currentTask.remove();
        taskObjArr.splice(objIndex, 1);
        saveLocalStorage();
    }
}

function handlerModal(event) {
    hendlerCloseModal(event);
    hendlerAddTask(event);
}

function addFocus(element) {
    setTimeout(() =>  element.focus(), 100);
}

function addModalListeners() {
    document.addEventListener('click', handlerModal);
    document.addEventListener('keydown', handlerModal);
}

function removeModalListeners() {
    document.removeEventListener('click', handlerModal);
    document.removeEventListener('keydown', handlerModal);
}

function handlerOpenModalAddTaskBtn(event) {
    event.stopPropagation();
    taskFormWrapper.classList.add('active');
    taskAddForm.classList.add('active');
    addModalListeners();
    addFocus(taskInputTitle);
}

//code
initTodoList();

//listeners

deleteAllTasks.addEventListener('click', handlerRemoveAllTaks)

taskBody.addEventListener('click', handlerRemoveTask);

taskAddBtn.addEventListener('click', handlerOpenModalAddTaskBtn);

