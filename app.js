const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// connecting a database

mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true})
.then(function() {
    console.log("Connected Successfully");
})
.catch(function(err) {
    console.error(err);
});

// describing and creating a schema

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: "Please check ur data, name field not specified", //validation to check the name field is not null, if it is null then the following message is printed
        minLength: 3
    },
    Email: {
        type: String,
        required: true,
        //validate: [validateEmail, 'Please fill a valid email address'],
    },
    MobileNo: {
        type: Number,
        required: true,
        min: 10
    },
    Message: {
        type: String,
        required: true,
        minLength: 3
    }
});

// creating a table for our schema

const User = mongoose.model("User", userSchema);

app.get("/", function(req, res) {
  res.render("home");
});

app.post("/", function(req, res) {
  const user1 = new User({
      Name: req.body.Name,
      Email: req.body.Email,
      MobileNo: req.body.MobileNo,
      Message: req.body.Message,
  });    
  const defaultItems = [user1];

// inserting elements into the table

  User.insertMany(defaultItems).then(function() {
      console.log("Successfully added to the DB");
    }).catch( function(err) { 
      console.log(err);
    });
});

app.listen(3000, function() {
    console.log("the port is in the server 3000");
});