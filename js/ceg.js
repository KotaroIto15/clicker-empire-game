// CONSTANTS //
const config = 
{
    login: document.getElementById("login-bg"),
    game: document.getElementById("game-bg"),
    itemList: document.getElementById("item-list"),
    confirmation: document.getElementById("confirmation"),
};

let user;

// CLASS DEFINITION //


function switchPage(hide, show) {
    hide.classList.add("d-none");
    show.classList.remove("d-none");
}

function displayItem(item) {
    let newName = item.name.replaceAll(" ", "-");
    
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

    container.addEventListener("click", function() {
        displayConfirmation(item);
    });

    config.itemList.append(container);
}

function displayConfirmation(item) {

    config.confirmation.innerHTML = "";

    let container = document.createElement("div");
    container.classList.add("h-100", "w-100");

    container.innerHTML =
    `
        <div class = "description">
            <div id = "basic-info">
                <h1>${item.name}</h1>
                <p>Max Purchase: ${item.max}</p>
                <p>Price: $${item.price}</p>
                <p>Get ${item.profit} extra yen per second</p>
            </div>
            <div class = "purchase-img-wrap">
                <img src="${item.image}" alt="">
            </div>
        </div>

        <div class = "enter-num">
            <p class = "ask">How Many would you like to purchase?</p>
            <input id = "num-purchase" type="text" placeholder="Please Enter Amount">
            <p id = "total-fee" class = "total-purchase">Total: $0</p>
        </div>

        <div class = "back-purchase">
            <button id = "go-back">Go Back</button>
            <button id = "confirm">Purchase</button>
        </div>
    `;

    config.confirmation.append(container);
    addEventsOnConfirmation(item);
    switchPage(config.itemList, config.confirmation);
}

function addEventsOnConfirmation(item) {
    let input = config.confirmation.querySelector("#num-purchase");
    input.addEventListener("change", function() {
        let amount = parseInt(input.value);
        let fee = document.getElementById("total-fee");
        fee.innerHTML = "Total: $" + (amount * item.price);
    });

    let back = config.confirmation.querySelector("#go-back");
    back.addEventListener("click", function() {
        switchPage(config.confirmation, config.itemList);
    });

    // when purchase is pressed, update the current state of items.
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
    console.log(config.game);
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