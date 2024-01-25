'use strict'

const mainContent = document.getElementById("main-content");
const loginModel = document.getElementById("login-modal");
const btnLogout = document.getElementById("btn-logout");
const welcomMessage = document.getElementById("welcome-message");

(function defaultLogoutButton() {
    btnLogout.style.display = 'none';
})();

function checkUserLogin() {
    console.log(currentUser);
    if (currentUser) {
        welcomMessage.innerText = `Welcome ${currentUser.firstname +" "+ currentUser.lastname}`;
        btnLogout.style.display = 'block';
        loginModel.style.display = 'none';
    }
}
checkUserLogin();
// console.log(userArr);
function actionAfterClickLogout() {
    deleteItemInStorage(KEY2);
    loginModel.style.display = 'block';
    mainContent.style.display = 'none';
    const confirmLogout = confirm('Do you want to logout?');
    if (confirmLogout) {
        // window.location.href = './pages/login.html';
        window.location.assign("./pages/login.html");
    }

}
btnLogout.addEventListener('click', actionAfterClickLogout);
