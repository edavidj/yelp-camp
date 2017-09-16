var express = require("express"),
    Campground = require("../models/Campground"),
    Middleware = require("../middleware"), //automatically gets index
    router = express.Router();
//============= ROUTES
//CREATE
router.post("/", Middleware.isLoggedIn,function(req,res) {
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
    var name = req.body.name,
        price = req.body.price,
        image = req.body.image,
        author = {
            id: req.user._id,
            username: req.user.username
        },
        description= req.body.description;
    var newCampground = { name:name, price:price, image:image, description:description, author:author };
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log(campground);
        }
    });
    res.redirect("/campgrounds"); //defaults to get request
});
//INDEX
router.get("/",  function(req, res) { 
    var user = req.user; 
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds, user: user});
        }
    });
});
//NEW
router.get("/new", Middleware.isLoggedIn, function(req,res) {
    res.render("campgrounds/new");
});
//SHOW- more info
router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(req.params.id);
            console.log(err);
        } else {
            // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", Middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){ 
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: campground});            
        }
    });
});
//UPDATE CAMPGROUN ROUTE
router.put("/:id", Middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.data, function(err, campground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
//DESTROY
router.delete("/:id", Middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds"); //eventually flash msg
        } else {
            res.redirect("/campgrounds");
        }
    });
});
module.exports = router;