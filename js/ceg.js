// CONSTANTS //
const config = 
{
    login: document.getElementById("login-bg"),
    game: document.getElementById("game-bg"),
    itemList: document.getElementById("item-list"),
};

let user;

// CLASS DEFINITION //


function switchPage(hide, show) {
    hide.classList.add("d-none");
    show.classList.remove("d-none");
}

function displayItem(item) {
    let newName = item.name.replace(" ", "-");
    
    let container = document.createElement("div");
    container.id = newName;
    container.classList.add("item");
    container.innerHTML = 
    `
        <div class="item-info">
            <div class="img-wrap">
                <img src="${item.image}" alt="">
            </div>

            <div class="name-price">
                <h2>${item.name}</h2>
                <p class="fs-4">$${item.price}</p>
            </div>
        </div>

        <div class="item-current-state">
            <h1 class="text-center" id = "item-number">2</h1>
            <p class="fs-4">+$${item.profit} / sec</p>
        </div>
    `;

    config.itemList.append(container);
}

function startGame() {
    let userName = document.getElementById("user-name");
    user = new User(userName.value);
    
    let profile = document.getElementById("right-div");
    profile.querySelector("#name").innerHTML = user.name;
    profile.querySelector("#age").innerHTML = user.age;
    profile.querySelector("#days").innerHTML = user.days;
    profile.querySelector("#money").innerHTML = user.balance;
}

let start = document.getElementById("start-new");
start.addEventListener("click", function() {
    config.itemList.innerHTML = "";
    items.forEach(displayItem);
    startGame();
    switchPage(config.login, config.game);
});

let burgerClick = document.getElementById("burger-click");
burgerClick.addEventListener("mousedown", function() {
    burgerClick.style.boxShadow = "none";

});
burgerClick.addEventListener("mouseup", function() {
    burgerClick.style.boxShadow = "0 1rem 2rem hsl(0, 0%, 32%)";
});