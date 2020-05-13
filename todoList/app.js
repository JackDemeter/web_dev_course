const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoDB", {useNewUrlParser: true, useUnifiedTopology: true});

const todoSchema = new mongoose.Schema ({
    date: Date,
    action: String
});

const Todo = mongoose.model("list", todoSchema);

// const todo = new Todo({
//     action: "make the todo list work"
// });

// todo.save();

app.get("/", function(req, res) {
    var today = new Date();
    var options = { 
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);

    Todo.find(function(err, found) {
        if (err){
            console.log(err);
        } else {
            res.render("todo", {date: day, list: found, extension: ""});
        }
    });
});

app.post("/", function(req, res){
    const item = new Todo({
        action: req.body.action
    });

    item.save();

    res.redirect("/");
});

app.post("/delete/", function(req, res){
    Todo.deleteOne({_id: req.body.check}, function(err){
        if (err){
            console.log(err);
        }else {
            console.log("deleted item: " + req.body.check);
            res.redirect("/");
        }
    });
});

app.get("/:list", function(req, res){
    const tempList = new mongoose.model(req.params.list, todoSchema);
    tempList.find(function(err, found) {
        if (err){
            console.log(err);
        } else {
            res.render("todo", {date: req.params.list, list: found, extension: req.params.list});
        }
    });
})

app.post("/:list", function(req, res){
    console.log(req.params.list);
    const tempList = new mongoose.model(req.params.list, todoSchema);
    const item = new tempList({
        action: req.body.action
    });
    item.save();
    res.redirect("/"+req.params.list);
})

app.post("/delete/:list", function(req, res){
    const tempList = new mongoose.model(req.params.list, todoSchema);

    tempList.deleteOne({_id: req.body.check}, function(err){
        if (err){
            console.log(err);
        }else {
            console.log("deleted item: " + req.body.check);
            res.redirect("/"+req.params.list);
        }
    });
});




app.listen(3000, function(){
    console.log("started port 3000")
});
