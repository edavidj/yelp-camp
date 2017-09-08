var express = require("express"),
    Campground = require("../models/Campground"),
    router = express.Router();
//============= ROUTES
//CREATE
router.post("/", isLoggedIn,function(req,res) {
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
    var name = req.body.name,
        image = req.body.image,
        author = {
            id: req.user._id,
            username: req.user.username
        },
        description= req.body.description;
    var newCampground = { name:name, image:image, description:description, author:author };
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
router.get("/new", isLoggedIn, function(req,res) {
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
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;