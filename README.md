```ascii
                       _               __                     __
                      (_)_____        / /_ ____ ___   ____   / /
                     / // ___/______ / __// __ `__ \ / __ \ / / 
                    / /(__  )/_____// /_ / / / / / // /_/ // /  
                 __/ //____/        \__//_/ /_/ /_// .___//_/   
                /___/                             /_/           
```
[![Node.js CI](https://github.com/chankamlam/js-tmpl/actions/workflows/node.js.yml/badge.svg)](https://github.com/chankamlam/js-tmpl/actions/workflows/node.js.yml)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![author](https://img.shields.io/badge/author-chankamlam-blue.svg)](https://github.com/chankamlam)

# Introduction
A javascript template engine for frontend and backend
# Installation
```
npm install @chankamlam/js-tmpl
```
# Usage

### Frontend Usage
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../../lib/index.js"></script>
</head>
<body>
    <div id="tmpl">
        My name is <%=name%> and i am <%=age%> years old.
        I live in <%=contact.address%> and <%my phone number is <%=contact.phone%>.
        My favorite coins are:
        <ul>
        <% coins.forEach(function(item){ %>
            <li><%= item %></li>
        <% }); %>
        </ul>
    </div>
    <script>
        window.onload = ()=>{
            var data = {
                name: "ckl",
                age: 18,
                contact: {
                    address: "hk of china",
                    phone: 888
                },
                coins: ["ETH", "BTC"]
            }
            var ele = document.getElementById("tmpl")
            ele.innerHTML = te.render(ele.innerText,data)
        }
    </script>
</body>
</html>
```
### Backend Usage
```
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
```

# API
### config(option)
```
  // option
  {
      openDelimiter:"<%",      // open delimiter
      closeDelimiter:"%>"      // close delimiter
  }
```
### render(tmpl,data)
```
tmpl => string
data => object.  // {}

```
### __express(filePath, data, callback)
```
filePath => string
data => object   // {}
callback => fn(err,response) // err:object, response:object
```
