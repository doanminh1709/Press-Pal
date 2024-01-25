'use strict';

const keyword = document.getElementById("input-query");
const newsContainer = document.getElementById("news-container");
const btnSubmit = document.getElementById("btn-submit");
const pageNum = document.getElementById("page-num");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const navPageNum = document.getElementById("nav-page-num");

const apiKey = "969e6d3dee8c49a182d158f3a5d3b95c";
const pageSize = currentUser.pageSize;
let totalPage;
let currentPage = 1;
navPageNum.style.display = "none";

const result = async function(){
    try{
        console.log(keyword.value);
        if(Boolean(keyword.value)){
            const linkAPI = `https://newsapi.org/v2/everything?q=${keyword.value}&apiKey=${apiKey}`;
            const data = await fetch(linkAPI);
            const response = await data.json();
    
             //If don't have result 
             if(response.totalResults == 0){
                throw new Error("Don't see result what valid!");
            }

            //Check error when access request greater 100 times per day 
            if (data.status === "error" && data.code === "rateLimited") {
                navPageNum.style.display = "none";
                throw new Error(data.message);
            }

            //Catch error when file don't thought server => run in server not have error 
            if (data.status === "error" && data.code === "corsNotAllowed") {
                navPageNum.style.display = "none";
                throw new Error(data.message);
            }

            navPageNum.style.display = "block";
            totalPage = response.articles.length;    
            pageNum.textContent = currentPage;
            
            // console.log(totalPage);
            
            defaultButtonPagination(totalPage, pageSize);
            pagination(response.articles, currentPage, pageSize);
        }else{
            alert('Please enter data!');
        }
    }catch(error){
        alert(error.message);
    }
}
btnSubmit.addEventListener('click' , result);

function defaultButtonPagination(totalPage, pageSize) {
    btnPrev.style.display = currentPage == 1 ? 'none' : 'block';
    btnNext.style.display = currentPage == Math.ceil(totalPage / pageSize) ? 'none' : 'block';
};

const pagination = function (data, current, pageSize) {
    newsContainer.innerHTML = '';
    if (current === 1) {
        for (let i = 1; i <= pageSize; i++) {
            generateHtml(data[i].urlToImage, data[i].url, data[i].title, data[i].description);
        }
    } else {
        current--;
        for (let i = current * pageSize + 1; i <= (current+1)*pageSize && totalPage; i++) {
            generateHtml(data[i].urlToImage, data[i].url, data[i].title, data[i].description);
        }
    }
}

btnPrev.addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        result();
    }
});
btnNext.addEventListener('click', function () {
    if (currentPage < Math.ceil(totalPage / pageSize)) {
        currentPage++;
        result();
    }
});

const generateHtml = (urlToImage, url, title, description) => {

    let html = `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
        <div class="row no-gutters">
        <div class="col-md-4">
            <img
            src="${urlToImage}"
            class="card-img"
            />
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <a
                href="${url}"
                class="btn btn-primary"
                >View</a>
            </div>
        </div>
        </div>
    </div>
    </div>`;
    newsContainer.innerHTML += html;
}