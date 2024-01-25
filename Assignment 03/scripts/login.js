'use strict'

const usernameRequest = document.getElementById("input-username");
const passwordRequest = document.getElementById("input-password");
const btnSubmitLogin = document.getElementById("btn-submit");

function validRequestLogin(userRequest) {
    if (!Boolean(userRequest.value) && !Boolean(userRequest.value)) {
        alert('Do not leave data fields blank!');
        return false;
    }

    if (!Boolean(userRequest.username)) {
        alert('Do not leave data username blank!');
        return false;
    }

    if (!Boolean(userRequest.password)) {
        alert('Do not leave data password blank!');
        return false;
    }

    if (userRequest.password.length < 8) {
        alert('Password is not valid!');
        return false;
    }
    return true;
}

function loginAction() {
    console.log("user arr :" , userArr);

    const findUser = userArr.find(item => item.username === usernameRequest.value 
        && item.password === passwordRequest.value);

        console.log(findUser);
    if (findUser) {
        alert('Login acount success!');
        //Router to news page
        window.location.href = '../index.html';
        //window.location.assign("../index.html");

        //Save current user to storage
        saveToStorage(KEY2, findUser);
    } else {
        alert('Login acount failed!');
    }
}
btnSubmitLogin.addEventListener('click', loginAction);