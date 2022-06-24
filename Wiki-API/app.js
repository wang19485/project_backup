//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/wikiDB');

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model('Article', articleSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO

app.route("/articles")
  .get(function(req, res) {
    Article.find(function(err, foundArticles) {
      if (err) {
        res.send(err);
      } else {
        res.send(foundArticles);
      }
    });
  })
  .post(function(req, res) {
    const newList = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newList.save();
    res.redirect("/articles");
  })
  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (err) {
        console.log(err);
      }
    });
  });

app.route("/articles/:articleTitle")
  .get(function(req, res) {
    Article.findOne({title:req.params.articleTitle}, function(err, foundArticles) {
      if (err) {
        res.send(err);
      } else {
        res.send(foundArticles);
      }
    });
  })
  .put(function(req, res){
    Article.findOneAndUpdate(
      {title:req.params.articleTitle},
      {title:req.body.title,content:req.body.content},
      {overwrite: true},
      function(err){
        if (err) {
          console.log(err);
        }
      });
  })
  .patch(function(req, res){
    Article.findOneAndUpdate(
      {title:req.params.articleTitle},
      {$set: req.body},
      function(err){
        if (err) {
          console.log(err);
        }
      });
  })
  .delete(function(req, res) {
    Article.findOneAndDelete({title:req.params.articleTitle}, function(err) {
      if (err) {
        console.log(err);
      }
    });
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
