//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const https = require("https");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-aditya:aditya@cluster0.t005x.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  FName: String,
  LName: String,
  Gender: String,
  City: String,
  State: String,
  Zip: Number,
  Address: String,
  content: String
};

const postdonateSchema = {
  FullName: String,
  Dcity: String,
  Dzip: Number,
  DItem: String,
  Dphone: Number,
  Daddress: String
};

const postcrimeSchema = {
  Ccity: String,
  Cstate: String,
  Czip: Number,
  Coption: String,
  Clocation: String,
  Ccontent: String
};

const Post = mongoose.model("Post", postSchema);
const Post1 = mongoose.model("Donate", postdonateSchema);
const Post2 = mongoose.model("Crime", postcrimeSchema);


app.get("/", function(req, res){
  res.render("index");
});

app.get("/index", function(req, res){
  res.render("index");
});

app.get("/donatehistory", function(req, res){

  Post1.find({}, function(err, donates){
    res.render("donatehistory", {
      donates: donates
      });
  });
});

app.get("/crimehistory", function(req, res){

  Post2.find({}, function(err, crimes){
    res.render("crimehistory", {
      crimes: crimes
      });
  });
});

app.get("/home", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      posts: posts
      });
  });
});


app.get("/success", function(req, res){
  res.render("success");
});


app.get("/successdonate", function(req, res){
  res.render("successdonate");
});

app.get("/successcrime", function(req, res){
  res.render("successcrime");
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/donation", function(req, res){
  res.render("donation");
});

app.get("/crime", function(req, res){
  res.render("crime");
});

app.post("/compose", function(req, res){
  const post = new Post({
    FName: req.body.postfname,
    LName: req.body.postlname,
    Gender: req.body.postgender,
    City: req.body.postcity,
    State: req.body.poststate,
    Zip: req.body.postzip,
    Address: req.body.postaddress,
    content: req.body.postContent
  });
  

  post.save(function(err){
    if (!err){
        res.redirect("/success");
    }
  });
});

app.post("/donation", function(req, res){
  const donate = new Post1({
    FullName: req.body.fullname,
    Dcity: req.body.donateCity,
    Dzip: req.body.donateZip,
    DItem: req.body.donateOption,
    Dphone: req.body.donatePhone,
    Daddress: req.body.donateAddress
});

  donate.save(function(err){
    if (!err){
        res.redirect("/successdonate");
    }
  });

});

app.post("/crime", function(req, res){
  const crime = new Post2({
    Ccity: req.body.crimeCity,
    Cstate: req.body.crimeState,
    Czip: req.body.crimeZip,
    Coption: req.body.crimeOption,
    Clocation: req.body.crimeLocation,
    Ccontent: req.body.crimeContent

});

  crime.save(function(err){
    if (!err){
        res.redirect("/successcrime");
    }
  });

});



app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      FName: post.FName,
      LName: post.LName,
      Gender: post.Gender,
      City: post.City,
      State: post.State,
      Zip: post.Zip,
      Address: post.Address,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about");
});


app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/map", function(req, res){
  res.render("map");
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server has started successfully.");
});
