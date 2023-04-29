// Class representing an item that player can buy to increase their profits
class Item {

    /**
     * 
     * @param {String} name : name of the item
     * @param {Integer} price : price of the item
     * @param {Integer} profit : profit made by the item
     * 
     * EFFECTS: creates an Item object with the given name, price and profit.
     */
    constructor(name, price, profit, maxAmount, imageUrl) {
        this.name = name;
        this.price = price;
        this.profit = profit;
        this.max = maxAmount;
        this.image = imageUrl;
    }
}

const items = [
    new Item("Burger Flipper", 15000, 25, 500, "images/burger-flipper.jpg"),
    new Item("ETF Stock", 300000, 300, "∞", "images/etf-stock.jpg"),
    new Item("ETF Bonds", 300000, 210, "∞", "images/etf-bonds.jpg"),
    new Item("Lemonade Stand", 30000, 30, 1000, "images/lemonade.jpg"),
    new Item("Ice Cream Truck", 100000, 120, 500, "images/ice-cream.png"),
    new Item("House", 20000000, 32000, 100, "images/house.png"),
    new Item("TownHouse", 40000000, 64000, 100, "images/townhouse.jpg"),
    new Item("Mansion", 250000000, 500000, 20, "images/mansion.jpg"),
    new Item("Industrial Space", 1000000000, 2200000, 10, "images/industrial-space.png"),
    new Item("Hotel Skyscraper", 10000000000, 25000000, 5, "images/skyscraper.png"),
    new Item("Bullet Train", 10000000000000, 30000000000, 1, "images/bullet-train.jpg"),
];