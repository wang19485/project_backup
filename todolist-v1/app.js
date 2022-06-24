const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const port = process.env.PORT || 3000;

var items = ["Buy Food","Cook Food","Eat Food"];
var workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {

  res.render("list", {
    listTitle: date.getTodayDay(),
    addNewItems: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }


});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    addNewItems: workItems
  });
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
