//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser") 
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
    
});

app.post("/bmicalculator", function(req, res){
    var height = Number(req.body.height);
    var weight = Number(req.body.weight);
    var BMI = weight/(height*height);
    res.send("Your BMI is " + BMI);
});

app.listen(3000);