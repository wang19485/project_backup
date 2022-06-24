//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://admin-yingjian:admin@cluster0.0kq7m.mongodb.net/todolistDB');

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to your todolist !"
});

const item2 = new Item({
  name: "Welcome to your todolist 2!"
});

const item3 = new Item({
  name: "Welcome to your todolist 3!"
});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
  name: String,
  items:[itemSchema]
});

const List = mongoose.model("List", listSchema);

// Item.deleteMany({},function(err){
//   if (err) {
//     console.log(err);
//   }
// });

//const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

const day = date.getDate();

app.get("/", function(req, res) {

  Item.find({},function(err, foundItems){
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems,function(err){
        if (err) {
          console.log(err);
        }
      });
    }
    res.render("list", {listTitle: day, newListItems: foundItems});
  });
});

app.get("/:customListName", function(req, res) {
  const customListName = req.params.customListName;

  List.findOne({name:customListName},function(err, result){
    if (result) {
      res.render("list", {listTitle: result.name, newListItems: result.items});
    }else{
      const list = new List({
        name: customListName,
        items:defaultItems
      });
      list.save();
      res.redirect("/"+customListName);
    }
  });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === day) {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name:listName},function(err,foundItems){
      foundItems.items.push(item);
      foundItems.save();
      res.redirect("/"+listName);
    });
  }


});

app.post("/delete", function(req, res){
  const checkboxItemId = req.body.checkbox;
  const listName = req.body.listHidden;

  if (listName === day) {
    Item.deleteOne({_id: checkboxItemId},function(err){
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/");
  } else {

    List.updateOne({name: listName},{$pull:{items:{_id: checkboxItemId}}},function(err){
      if (err) {
        console.log(err);
      }
      res.redirect("/"+listName);
    });
    }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(PORT, function() {
  console.log("Server started on port");
});
