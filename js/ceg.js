// CONSTANTS //

const config = 
{
    login: document.getElementById("login-bg"),
    game: document.getElementById("game-bg"),
    itemList: document.getElementById("item-list"),
    confirmation: document.getElementById("confirmation"),

    burger: document.getElementById("burger-info"),
    profile: document.getElementById("profile"),
};

// const mysql = require("mysql");
// const dotenv = require("dotenv").config();

let game;
let interval;
var socket = io();

// CLASS DEFINITION //
class Game {

    /**
     * 
     * @param {String} name : name of the user
     * @param {int} age : current age of the user, starting from 0,
     * @param {int} days : current days passed in the game, starting from 0.
     * @param {int} money : current balance of the player.
     * @param {int} burgers : current # of burgers made.
     * @param {Map<String, int>} itemStates : mapping the name of the item to the # of items purchased by the player.
     */

    constructor(name) {
        this.name = name;
        this.age = 0;
        this.days = 0;
        this.money = 10000000000000;
        this.burgers = 0;
        this.itemStates = this.initializeMap();
    }

    initializeMap() {
        let map = new Map();
        map.set("Burger Flipper", 1);

        for (let i = 1; i < items.length; i++) {
            let item = items[i];
            map.set(item.name, 0);
        }

        return map;
    }

    findItem(key) {
        return this.itemStates.get(key);
    }

    purchaseItem(item, amount, finalPrice) {


        if (this.money < finalPrice) {
            alert("Insufficient Balance. Please try different amount.");
            return;
        }

        this.itemStates.set(item.name, this.findItem(item.name) + amount);
        this.money -= finalPrice;
        if (item.name == "ETF Stock") item.price = Math.round(item.price * Math.pow(1.1, amount));

        this.updateProfit(item);
    }

    calculateTotalPrice(item, amount) {
        if (item.name == "ETF Stock") return Math.round(item.price * 10 * (Math.pow(1.1, amount) - 1));
        else return item.price * amount;
    }

    updateProfit(item) {
        if (item.name == "ETF Stock") item.profit = Math.round(300000 * Math.pow(1.1, game.findItem(item.name)) * 0.001);
        else if (item.name == "ETF Bonds") item.profit += 300000 * 0.0007;
    }
}


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
            <h1 class="text-center" id = "item-number">${game.findItem(item.name)}</h1>
            <p class="fs-4">+$${item.profit} / sec</p>
        </div>
    `;

    container.addEventListener("click", function() {
        displayConfirmation(item);
    });

    config.itemList.append(container);
}

function updateItemList() {
    config.itemList.innerHTML = "";
    items.forEach(displayItem);
    config.burger.querySelector("#burger-per-sec").innerHTML = "$" + (25 * game.findItem("Burger Flipper") + " per second");
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
        let totalPrice = game.calculateTotalPrice(item, amount);
        fee.innerHTML = "Total: $" + totalPrice;
    });

    let back = config.confirmation.querySelector("#go-back");
    back.addEventListener("click", function() {
        switchPage(config.confirmation, config.itemList);
    });

    // when purchase is pressed, update the current state of items.
    let purchase = config.confirmation.querySelector("#confirm");
    purchase.addEventListener("click", function() {
        if (input.value == null) return;

        let amount = parseInt(input.value);
        game.purchaseItem(item, amount, game.calculateTotalPrice(item, amount));
        updateItemList();
        config.profile.querySelector("#money").innerHTML = "$" + game.money;
        switchPage(config.confirmation, config.itemList);
    });
}

function startGame() {
    let userName = document.getElementById("user-name").value;
    game = new Game(userName);
    
    setProfile();
    update();
}

function resumeGame(data) {
    game = new Game(data.name);

    game.age = parseInt(data.age);
    game.days = parseInt(data.days);
    game.money = parseInt(data.money);
    game.burgers = parseInt(data.burgers);
    game.itemStates = new Map(Object.entries(data.itemStates));
    items.forEach((item)=>{
        let val = game.findItem(item.name);
        game.itemStates.set(item.name, parseInt(val));
    });

    setProfile();

    update();
}

function setProfile() {
    let profile = document.getElementById("right-div");
    profile.querySelector("#name").innerHTML = game.name;
    profile.querySelector("#age").innerHTML = game.age;
    profile.querySelector("#days").innerHTML = game.days;
    profile.querySelector("#money").innerHTML = "$" + game.money;
}

function update() {
    interval = setInterval(function() {
        game.days++;
        if (game.days % 365 == 0) game.age++;
    
        config.profile.querySelector("#days").innerHTML = game.days + " days";
        config.profile.querySelector("#age").innerHTML = game.age;

        updateMoney();
    }, 1000);
}

function updateMoney() {
    let profit = 0;

    items.forEach((item) => {
        if (item.name == "Burger Flipper") return;
        let numItem = game.findItem(item.name);
        if (numItem <= 0) return;

        if (item.name == "ETF Stock") profit += 300000 * 10 * (Math.pow(1.1, game.findItem("ETF Stock")) - 1) * 0.001;
        else if (item.name == "ETF Bonds") profit += 300000 * game.findItem("ETF Bonds") * 0.0007;
        else profit += item.profit * game.findItem(item.name);
    });
    
    game.money += parseInt(profit);
    config.profile.querySelector("#money").innerHTML = "$" + game.money;
}

function writeToJSON() {
    // let text = 
    // `
    // {
    //     "name" : "${game.name}",
    //     "age" : "${game.age}",
    //     "days" : "${game.days}",
    //     "money" : "${game.money}",
    //     "burgers" : "${game.burgers}",
    //     "itemStates":
    //     {
    //         "Burger Flipper" : "${game.findItem("Burger Flipper")}",
    //         "ETF Stock" : "${game.findItem("ETF Stock")}",
    //         "ETF Bonds" : "${game.findItem("ETF Bonds")}",
    //         "Lemonade Stand" : "${game.findItem("Lemonade Stand")}",
    //         "Ice Cream Truck" : "${game.findItem("Ice Cream Truck")}",
    //         "House" : "${game.findItem("House")}",
    //         "TownHouse" : "${game.findItem("TownHouse")}",
    //         "Mansion" : "${game.findItem("Mansion")}",
    //         "Industrial Space" : "${game.findItem("Industrial Space")}",
    //         "Hotel Skyscraper" : "${game.findItem("Hotel Skyscraper")}",
    //         "Bullet Train" : "${game.findItem("Bullet Train")}"
    //     }
    // }
    // `;

    let states = [];
    items.forEach((item) => {
        states.push(game.findItem(item.name));
    });

    socket.emit("store", states);


    // var con = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: process.env.SQL_PASS
    // });

    // con.connect(function(err){
    //     if (err) throw err;
    //     else console.log("Connected!")
    // });

    // localStorage.setItem(game.name, text);
}

let start = document.getElementById("start-new");
start.addEventListener("click", function() {
    let userName = document.getElementById("user-name").value;
    if (localStorage.getItem(userName) != null) alert("You cannot use this user name. Try typing another name.");

    else {
        config.itemList.innerHTML = "";
        startGame();
        updateItemList();
        switchPage(config.login, config.game);
    }
});

let resume = document.getElementById("resume");
resume.addEventListener("click", function() {
    socket.emit('load', document.getElementById("user-name").value);
    socket.on("load", function(msg){
        console.log(msg);
    });
    // let text = localStorage.getItem(document.getElementById("user-name").value);
    // if (text == null) {
    //     alert("Entered username does not have a saved game state. Please start a new game or try typing another name.");
    //     return;
    // }
    // let data = JSON.parse(text);
    // resumeGame(data);
    // updateItemList();
    // switchPage(config.login, config.game);
});

let save = document.getElementById("save");
save.addEventListener("click", function() {
    writeToJSON();
    alert("saved!!");
});

let reset = document.getElementById("reset");
reset.addEventListener("click", function() {
    if (confirm("Do you want to save the current game state?")) writeToJSON();

    clearInterval(interval);
    switchPage(config.game, config.login);
});

let burgerClick = document.getElementById("burger-click");
burgerClick.addEventListener("mousedown", function() {
    burgerClick.style.boxShadow = "none";
    game.burgers++;
    game.money += (25 * game.findItem("Burger Flipper"));

    config.profile.querySelector("#money").innerHTML = "$" + game.money;
    config.burger.querySelector("#burger-num").innerHTML = game.burgers + " burgers";
    config.burger.querySelector("#burger-per-sec").innerHTML = "$" + (25 * game.findItem("Burger Flipper") + " per second");
});

burgerClick.addEventListener("mouseup", function() {
    burgerClick.style.boxShadow = "0 1rem 2rem hsl(0, 0%, 32%)";
});