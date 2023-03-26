class User {
    constructor(name) {
        this.name = name;
        this.age = 0;
        this.days = 0;
        this.balance = 0;
        this.burgers = 0;
        this.itemMap = this.initializeMap();
    }

    initializeMap() {
        let map = new Map();
        items.forEach(function(item) {
           map.set(item.name, 0);
        });
        return map;
    }

    
}