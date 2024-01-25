'use strict'

const KEY = "USER_ARRAY";
const KEY2 = "CURRENT_USER_ARRAY";
const KEY3 = "TODO_ARRAY";
const KEY4 = "INFO_SETUP";

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function deleteItemInStorage(key) {
    localStorage.removeItem(key);
}

const users = getFromStorage(KEY) ? getFromStorage(KEY) : [];
const todos = getFromStorage(KEY3) ?? [];
const currentUser = getFromStorage(KEY2) ?? null;
const currentUserArr = getFromStorage(KEY2);
const infoSetup = getFromStorage(KEY4);


function parseUser(request) {
    const user = new User(
        request.firstname,
        request.lastname,
        request.username,
        request.password, 
        request.pageSize , 
        request.category);
    return user;
}

function parseTask(request){
    const task = new Task(
        request.task , 
        request.owner , 
        request.isDone
    );
    return task;
}


const userArr = users.map((item) => parseUser(item));
const todoArr = todos.map((item) => parseTask(item));