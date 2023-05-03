const http = require("http");
const fs = require("fs");
const url = require("url");
const { isObject } = require("util");

const server = http.createServer(routeSetting);
const io = require('socket.io')(server);

function routeSetting(req, res) {
    let url_parts = url.parse(req.url);
    switch(url_parts.pathname){
        case '/':
        case '/index.html':
            const html = fs.readFileSync("./index.html");
            console.log("index.html is read");
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.write(html);
            res.end();
            break;
        case '/style.css':
            const css = fs.readFileSync("./style.css");
            console.log("style.css is read");
            res.writeHead(200, {"Content-Type" : "text/css"});
            res.write(css);
            res.end();
            break;
        case '/js/ceg.js':
            const ceg = fs.readFileSync("./js/ceg.js");
            console.log("ceg.js is read");
            res.writeHead(200, {"Content-Type" : "application/javascript"});
            res.write(ceg);
            res.end();
            break;
        case '/js/Item.js':
            const item = fs.readFileSync("./js/Item.js");
            console.log("Item.js is read");
            res.writeHead(200, {"Content-Type" : "application/javascript"});
            res.write(item);
            res.end();
            break;
        case '/images/burger-flipper.jpg':
            const bf = fs.readFileSync("./images/burger-flipper.jpg");
            console.log("burger flipper read");
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            res.write(bf);
            res.end();
            break;
        case '/images/burger.png':
            const bg = fs.readFileSync("./images/burger.png");
            console.log("burger read");
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            res.write(bg);
            res.end();
            break;
        case '/images/etf-bonds.jpg':
            const eb = fs.readFileSync("./images/etf-bonds.jpg");
            console.log("etfbonds read");
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            res.write(eb);
            res.end();
            break;
        case '/images/etf-stock.jpg':
            const es = fs.readFileSync("./images/etf-stock.jpg");
            console.log("etfstock read");
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            res.write(es);
            res.end();
            break;
        case '/images/house.png':
            const hs = fs.readFileSync("./images/house.png");
            console.log("house read");
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            res.write(hs);
            res.end();
            break;
        case '/images/ice-cream.png':
            const ic = fs.readFileSync("./images/ice-cream.png");
            console.log("icecream read");
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            res.write(ic);
            res.end();
            break;
        case '/images/industrial-space.png':
            const is = fs.readFileSync("./images/industrial-space.png");
            console.log("industrial space read");
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            res.write(is);
            res.end();
            break;
        case '/images/lemonade.jpg':
            const lm = fs.readFileSync("./images/lemonade.jpg");
            console.log("lemonade read");
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            res.write(lm);
            res.end();
            break;
        case '/images/mansion.jpg':
            const ms = fs.readFileSync("./images/mansion.jpg");
            console.log("mansion read");
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            res.write(ms);
            res.end();
            break;
        case '/images/skyscraper.png':
            const sc = fs.readFileSync("./images/skyscraper.png");
            console.log("skyscraper read");
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            res.write(sc);
            res.end();
            break;
        case '/images/bullet-train.jpg':
            const bt = fs.readFileSync("./images/bullet-train.jpg");
            console.log("bullet train read");
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            res.write(bt);
            res.end();
            break;
        case '/images/townhouse.jpg':
            const th = fs.readFileSync("./images/townhouse.jpg");
            console.log("townhouse read");
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            res.write(th);
            res.end();
            break;
        default:
            res.writeHead(200, {"Content-Type" : "text/plain"});
            res.end("Page not found");
            break;
    }
}

io.on('connection', function(socket){

    socket.on("store", function(msg){
        console.log(msg[0]);
    });

    socket.on("load", function(msg){
        console.log(msg);
        io.emit("load", "received");
    });
});

server.listen(3000);
console.log("Server start!");