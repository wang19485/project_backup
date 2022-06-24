const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const assert = require('assert');

mongoose.connect('mongodb://localhost:27017/FruitsDB');

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Why no name?']
  },
  rating: {
    type: Number,
    min:1,
    max:10
  },
  review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "pretty good"
});

//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person",personSchema);

const person = new Person({
  name:"John",
  age:37
});

person.save();

const kiwi = new Fruit({
  name: "Kimi",
  rating: 7,
  review: "best fruit"
});

const bana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weired fruit"
});

//Fruit.insertMany([kiwi, bana],function(error, docs) {});

Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  }else{
    mongoose.connection.close();
    fruits.forEach(function(element){
      console.log(element.name);
    });
  }
});


// Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'myproject';
//
// // Create a new MongoClient
// const client = new MongoClient(url);
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   client.close();
// });
