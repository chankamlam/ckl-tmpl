var express = require('express');
var tmpl = require("@chankamlam/js-tmpl")
var path = require('path');

var app = express();


app.engine('tmpl', tmpl.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'tmpl');


app.get('/', function (req, res) {
    var data = {
        name: "ckl",
        age: 18,
        contact: {
            address: "hk of china",
            phone: 888
        },
        coins: ["ETH", "BTC"]
    }
    res.render('index', data);
});

app.listen(3000,()=>{
    console.log('Express started on port 3000');
});