var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
/**
 * Once done the tutorial look into adding features for receiving pictures from my imgur
 * AS well as uplading them to imgur (find a way to determine that it is yeri)
 */
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req,res) {
   res.render("landing");
});
var campgrounds= [
        {name: "Salmon Creek", image: "https://farm1.staticflickr.com/110/316612922_38fb0698f5.jpg"},
        {name: "Granite Hill", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name: "Salmon Creek", image: "https://farm1.staticflickr.com/110/316612922_38fb0698f5.jpg"},
        {name: "Granite Hill", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name: "Salmon Creek", image: "https://farm1.staticflickr.com/110/316612922_38fb0698f5.jpg"},
        {name: "Granite Hill", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"}
       ] 
app.get("/campgrounds", function(req, res) {   
   res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res) {
   //get data from form and add to campgrounds array
   //redirect back to campgrounds page
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name:name,image:image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds"); //defaults to get request
});
app.get("/campgrounds/new", function(req,res) {
    res.render("new.ejs");
});
app.listen(3000, function(){
    console.log("The Yelp Camp server has started.");
})