var express = require("express");
var app = express();
var mysql = require('mysql');
var config = require("./config/config.json");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var redis = require('redis');

// create a new redis client and connect to our local redis instance
client = redis.createClient(6379, "127.0.0.1");

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
    client.quit(); 
});

client.on("connect", function () {
    console.log("Redis Connected");
});




app.listen(config.PORT);
console.log(config.PORT);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
    next();
});

app.use(function(req, res, next) {
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', require('./routes'));
