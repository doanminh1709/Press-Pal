'use strict';

const todoList = document.getElementById("todo-list");
const btnAdd = document.getElementById("btn-add");
const title = document.getElementById("input-task");
const closeTask = document.querySelector(".close");

function createTaskInTodoList() {
    if (currentUser !== null) {
        //check job finsh or don't finish
        const titleExists = todoArr.filter(item => item.owner === currentUser.username)
            .find(item => { item.task === item.value; });

        if (title.value.trim().length !== 0) {
            if(titleExists){
                alert('This title is exists !');
            }else{
                const newTask = new Task(title.value, currentUser.username, false);
                todoArr.push(newTask);
                saveToStorage(KEY3, todoArr);
                generateListTodo();
                title.value = "";
            }
        } else {
            alert('Enter title , please!');
        }
    } else {
        alert('You need login first , please!');
    }
}
btnAdd.addEventListener('click', createTaskInTodoList);

function generateListTodo() {
    todoList.innerHTML = '';
    console.log(todoArr);
    if (currentUser) {
        todoArr.filter(item => item.owner === currentUser.username).forEach(item => {
            let html = `<li class=${item.isDone ? "checked" : ""}>${item.task}<span class="close">×</span></li>`
            todoList.innerHTML += html;
        });
    }
};
generateListTodo();
//Traversing technique 
todoList.addEventListener('click', function (event) {
    //THe first way : Get all element has class "close" inside div has class "todo-list"
    // document.querySelectorAll("#todo-list .close").forEach(function(closeEl){
    //     closeEl.addEventListener("click" , function(){})
    // })
    if (event.target.className === "close") {
        const isConfirm = confirm("Do you want to sure delete?");
        if (isConfirm) {
            const position = Array.from(todoList.children).indexOf(event.target.parentNode);
            todoArr.splice(position, 1);
            saveToStorage(KEY3, todoArr);
            generateListTodo();
        }
    } else {
        const targetLi = event.target;
        targetLi.classList.toggle("checked");
        const index = Array.from(todoList.children).indexOf(targetLi);
        todoArr[index].isDone = targetLi.classList.contains("checked") ? true : false;
        saveToStorage(KEY3, todoArr);
    }
});

