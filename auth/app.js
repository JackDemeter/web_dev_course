//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"))

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/loginDB", {useNewUrlParser: true, useUnifiedTopology: true});

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


loginSchema.plugin(encrypt, {secret : process.env.SECRET, encryptedFields: ["password"]});


const User = mongoose.model("User", loginSchema);

app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){
    User.findOne({username: req.body.username}, function(err, found){
        if (err) {
            console.log(err);
        } else {
            if (found) {
                if (found.password === req.body.password){
                    console.log("user " + req.body.username + " has logged in.");
                    res.render("secrets");
                } else {
                    res.redirect("/login");
                }
            } else {
                console.log("user " + req.body.username + " login failed.");
                res.redirect("/login");
             }
        }
    })
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user.save(function(err){
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            res.render("secrets")
        }
    });

});


app.listen(3000, function(req, res){
    console.log("listening on 3000");
})