const BASE_URL = "https://lighthouse-user-api.herokuapp.com/api/v1/users/"
const users = JSON.parse(localStorage.getItem("friendsList"))
const dataPannel = document.getElementById("dataPannel")
const remove = document.querySelector(".remove")

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
        remove.dataset.id = userData.id
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

/*移除好友*/
function removeFriends(id) {
    const userIndex = users.findIndex((user) => user.id === id)
    users.splice(userIndex, 1)
    localStorage.setItem("friendsList", JSON.stringify(users))
    renderUser(users)
}

renderUser(users)


/*設置點擊監聽載入Modal事件*/
dataPannel.addEventListener("click", function onPannel(event) {
    if (event.target.matches(".user-img") || event.target.matches(".user-name")) {
        showUserModal(event.target.parentElement.dataset.id)
    }
})

/*設置點擊監聽移除好友事件 */
remove.addEventListener("click", function clickRemove(event) {
    removeFriends(Number(event.target.dataset.id))
})
