'use strict'

const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmitRegister = document.getElementById("btn-submit");


function checkUserExists(username) {
    const findUser = userArr.find(item => item.username === username);
    console.log(findUser);
    return findUser !== undefined;
}

function validateUserRegister(userRequest) {
    //Not all field exists 
    console.log(userRequest);
    if (!Boolean(userRequest.firstname) || !Boolean(userRequest.lastname)
        || !Boolean(userRequest.username) || !Boolean(userRequest.password)
        || !Boolean(inputPasswordConfirm.value)) {
        alert('Not some field has exists!');
        return false;
    }

    if (checkUserExists(userRequest.username)) {
        alert(`Username : ${userRequest.username} is exists!`);
        return false;
    }

    if (userRequest.password !== inputPasswordConfirm.value) {
        alert('Password is not same password confirm!');
        return false;
    }

    if (userRequest.password.length <= 8) {
        alert('Password minxumum has 8 character!');
        return false;
    }
    return true;
}

function registerAction() {
    const request = new User(
        inputFirstName.value , 
        inputLastName.value, 
        inputUsername.value, 
        inputPassword.value
    );
    console.log("request " , request);
    if (validateUserRegister(request)) {
        userArr.push(request);
        //Save to local storage
        saveToStorage(KEY, userArr);
        //router page 
        alert("Register account success!");
        window.location.href = '../pages/login.html';
    }
}

btnSubmitRegister.addEventListener('click', registerAction);
