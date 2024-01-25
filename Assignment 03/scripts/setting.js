'use strict'

const btnSubmit = document.getElementById("btn-submit");
const inputPerPage = document.getElementById("input-page-size");
const selectCategory = document.getElementById("input-category");
const selectElement = document.getElementById("input-category");

const categoryInit = {
    "general": "General",
    "technology": "Technology",
    "science": "Science",
    "business": "Business",
    "entertainment": "Entertainment",
    "health": "Health",
    "sports": "Sports",
};

function checkValue(pageSize) {
    return !isNaN(Number.parseInt(pageSize));
}

const updateInfosetup = function () {
    if (checkValue(inputPerPage.value)) {
        currentUser.pageSize = inputPerPage.value;
        currentUser.category = selectCategory.value;

        alert('Save info success!');
        const index = userArr.findIndex(user => user.username === currentUser.username);

        userArr[index].pageSize = inputPerPage.value;
        userArr[index].category = selectCategory.value;

        saveToStorage(KEY2 , currentUser);
        saveToStorage(KEY, userArr);
    }
};
btnSubmit.addEventListener('click', updateInfosetup);

(function initInfoSetting() {
    for (const key in categoryInit) {
        //hasOwnProperty : check a object to see it has detail property
        if (categoryInit.hasOwnProperty(key)) {
            const option = document.createElement("option");
            option.value = key;
            option.text = categoryInit[key];
            selectElement.appendChild(option);
            if (key === currentUser.category) {
                option.selected = true;
                inputPerPage.value = currentUser.pageSize;
            }
        }
    }
})();