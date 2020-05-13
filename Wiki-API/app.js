const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("views engine", 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true})

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

app.get("/", function(req, res){
    res.send("hello");
});

app.route("/articles")
    .get(function(req, res){
        Article.find(function(err, found){
            if(err){
                console.log(err);
            } else {
                res.send(found);
            }
        });
    })
    .post(function(req, res){
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        });
        article.save(function(err){
            if (err){
                console.log(err);
                res.send(err);
            } else {
                console.log("Successfully added " + req.body.title);
                res.send("Successfully added " + req.body.title);
            }
        });
    })
    .delete(function(req, res){
        Article.deleteMany(function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            } else {
                console.log(result)
                res.send(result);
            }
        });
    });


app.route("/articles/:title")
    .get(function(req, res){
        Article.findOne({title: req.params.title}, function(err, found){
            if(err){
                console.log(err);
            } else {
                res.send(found);
            }
        });
    })
    .put(function(req, res){
        Article.updateOne(
            {title: req.params.title},
            {title: req.body.title, content: req.body.content}, 
            {overwrite: true}, 
            function(err, results){
                if(err){
                    res.send(err);
                } else {
                    res.send(results);
                }
            });
    })
    .patch(function(req, res){
        Article.updateOne(
            {title: req.params.title},
            {$set : req.body}, 
            function(err, results){
                if(err){
                    res.send(err);
                } else {
                    res.send(results);
                }
            });
    })
    .delete(function(req, res){
        Article.deleteOne({title: req.params.title}, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            } else {
                console.log(result)
                res.send(result);
            }
        });
    });


app.listen(3000, function(req, res){
    console.log("connected to port 3000");
});
