var express = require("express"),
    Campground = require("../models/Campground"),
    Comment = require("../models/Comment"),
    router = express.Router({mergeParams:true});
// COMMENT ROUTES
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground})
        }
    });
});
router.post("/", isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                //add username and id to comment then save it
                let username = req.user.username; //will always be defined at this point
                comment.author.id = req.user._id;
                comment.author.username = username;
                comment.save();
                campground.comments.push(comment);
                campground.save();
                res.redirect("/campgrounds/"+campground._id);
            });
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