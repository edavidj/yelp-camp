var express = require("express"),
    Campground = require("../models/Campground"),
    Comment = require("../models/Comment"),
    Middleware = require("../middleware"), //automatically gets index
    router = express.Router({mergeParams:true});
// COMMENT ROUTES
//NEW
router.get("/new", Middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground})
        }
    });
});
//CREATE
router.post("/", Middleware.isLoggedIn, function(req,res){
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
//EDIT
router.get("/:comment_id/edit", Middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        res.render("comments/edit", {campground:req.params.id, comment: foundComment});
    });    
});
//UPDATE
router.put("/:comment_id", Middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, newComment){
        if(err){
            res.redirect("back"); //add better error handling
        } else {
            res.redirect("/campgrounds/"+req.params.id); //passed from app.js
        }
    });
});
//DESTROY
router.delete("/:comment_id", Middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, newComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
module.exports = router;