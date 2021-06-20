const BASE_URL = "https://lighthouse-user-api.herokuapp.com/api/v1/users/"
const users = []
const USER_PER_PAGE = 12
const dataPannel = document.getElementById("dataPannel")
const pagination = document.querySelector(".pagination")
const like = document.querySelector(".like")

/*導入用戶*/
function renderUser(data) {
    let rowHTML = ""
    data.forEach((item) => {
        rowHTML += `<div class="col-3 mt-3">
                        <a class="user d-flex flex-column text-decoration-none link-dark" href="#" data-bs-toggle="modal"
                        data-bs-target="#userModal" data-id="${item.id}">
                            <img src="${item.avatar}" class="user-img img-fluid" alt="avatar">
                            <h2 class="user-name fs-6">${item.name} ${item.surname}</h2>
                        </a>
                    </div>`
    })
    dataPannel.innerHTML = rowHTML
}
/*渲染正確的頁數分頁器*/
function renderPagination(page) {
    const numberOfPages = Math.ceil(users.length / USER_PER_PAGE)
    let rawHTML = ""
    if (page <= 1) {
        rawHTML = `<li class="page-item"><a class="page-link next" href="#" data-page="${page + 1
            }">NEXT</a></li>`
    } else if (page >= numberOfPages) {
        rawHTML = `<li class="page-item"><a class="page-link prev" href="#" data-page="${page - 1}">PREV</a></li>`
    } else {
        rawHTML = `<li class="page-item"><a class="page-link prev" href="#" data-page="${page - 1
            }">PREV</a></li>
    <li class="page-item"><a class="page-link next" href="#" data-page="${page + 1}">NEXT</a></li>`
    }

    pagination.innerHTML = rawHTML
}
/*每頁12個人*/
function userEachPage(page) {
    const start = (page - 1) * USER_PER_PAGE
    return users.slice(start, start + USER_PER_PAGE)
}
/*指定用戶資料導入Modal*/
function showUserModal(id) {
    let userGender = document.getElementById("userGender")
    let userName = document.getElementById("userName")
    let userBirthday = document.getElementById("userBirthday")
    let userAge = document.getElementById("userAge")
    let userRegion = document.getElementById("userRegion")
    let userEmail = document.getElementById("userEmail")
    let userAvatar = document.getElementById("userAvatar")

    axios.get(BASE_URL + id).then((response) => {
        const userData = response.data
        like.dataset.id = userData.id
        userName.innerText = userData.name + " " + userData.surname
        userBirthday.innerText = userData.birthday
        userAge.innerText = "(" + userData.age + ")"
        userRegion.innerText = userData.region
        userEmail.innerText = userData.email
        userAvatar.src = userData.avatar
        if (String(userData.gender) === "male") {
            userGender.innerHTML = '<i class="fas fa-mars"></i>'
        } else {
            userGender.innerHTML = '<i class="fas fa-venus"></i>'
        }
    })
}
/*加入好友*/
function addFreiends(id) {
    const list = JSON.parse(localStorage.getItem("friendsList")) || []
    const user = users.find((user) => user.id === id)
    if (list.some(user => user.id === id)) {
        return alert('You guys are already friends!')
    } 
    list.push(user)
    console.log(list)
    localStorage.setItem("friendsList", JSON.stringify(list))
    console.log(user.id)
    
}
axios.get(BASE_URL).then((response) => {
    users.push(...response.data.results)
    renderUser(userEachPage(1))
    renderPagination(1)
})

/*設置點擊監聽載入Modal事件*/
dataPannel.addEventListener("click", function onPannel(event) {
    if (event.target.matches(".user-img") || event.target.matches(".user-name")) {
        showUserModal(event.target.parentElement.dataset.id)
    }
})

/*設置點擊監聽載入頁數事件*/
pagination.addEventListener("click", function clickPagination(evnet) {
    const page = Number(evnet.target.dataset.page)
    renderPagination(page)
    renderUser(userEachPage(page))
})

/*設置點擊監聽加入好友事件*/
like.addEventListener("click", function clickLick(event) {
    addFreiends(Number(event.target.dataset.id))
})
