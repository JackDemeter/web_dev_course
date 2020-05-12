const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




app.get("/", function(req, res) {
    var today = new Date();
    var options = { 
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render("todo", {date: day,list: items});
});

app.post("/", function(req, res){
    items.push(req.body.action);
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("started port 3000")
});
