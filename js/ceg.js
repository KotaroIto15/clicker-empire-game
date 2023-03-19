// CONSTANTS //
const config = 
{
    login: document.getElementById("login-bg"),
    game: document.getElementById("game-bg"),
    itemList: document.getElementById("item-list"),
};

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
            <p class="fs-4">+$${item.prfit} / sec</p>
        </div>
    `;

    config.itemList.append(container);
}

let start = document.getElementById("start-new");
start.addEventListener("click", function() {
    config.itemList.innerHTML = "";
    items.forEach(displayItem);
    switchPage(config.login, config.game);
});
