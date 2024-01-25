'use strict'

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const newsContainer = document.getElementById("news-container");
const pageNum = document.getElementById("page-num");
const navPageNum = document.getElementById("nav-page-num");


if (currentUser) {
    const apiKey = "969e6d3dee8c49a182d158f3a5d3b95c";
    const pageSize = currentUser.pageSize;
    const category = currentUser.category;
    const linkAPI = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    let totalPage;
    let currentPage = 1;
    async function getData() {
        try {
            const data = await fetch(linkAPI);
            const res = await data.json();

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
            totalPage = res.articles.length;
            pageNum.textContent = currentPage;

            defaultButtonPagination(totalPage, currentUser.pageSize);
            pagination(res.articles, currentPage, currentUser.pageSize);
        } catch (err) {
            alert(err.message);
        }
    };
    getData();

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
            for (let i = current * pageSize + 1; i <= (current + 1) * pageSize && totalPage; i++) {
                generateHtml(data[i].urlToImage, data[i].url, data[i].title, data[i].description);
            }
        }
    }

    btnPrev.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            getData();
        }
    });

    btnNext.addEventListener('click', function () {
        if (currentPage < Math.ceil(totalPage / currentUser.pageSize)) {
            currentPage++;
            getData();
        }
    });

    const generateHtml = (urlToImage, url, title, description) => {

        let html = `<div class="card flex-row flex-wrap">
        <div class="card mb-3" style="">
            <div class="row no-gutters">
            <div class="col-md-4">
                <img
                src="${urlToImage ? urlToImage : "no_image_available.jpg"}"
                alt="img"
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
                    target="_blank"
                    >View</a>
                </div>
            </div>
            </div>
        </div>
        </div>`;
        newsContainer.innerHTML += html;
    }
}else{
    navPageNum.style.display ="none";
}