//all middleware here
var Campground = require("../models/Campground"),
    Comment = require("../models/Comment");
var Middleware = (function(){
    function checkCommentOwnership(req,res,next){
        if(!req.isAuthenticated()){ 
            res.redirect("/login");
        } else {
            Comment.findById(req.params.comment_id, function(err, comment){
                if(err) {
                    req.flash("error","Comment not found.");
                    res.redirect("back");
                } else {
                    if(comment.author.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that!");
                        res.redirect("back");
                    }
                }
            });
        }
    }
    function isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("/login");
    }
    function checkCampgroundOwnership(req,res,next){
        if(!req.isAuthenticated()){
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("/login");
            return;
        } else {
            Campground.findById(req.params.id, function(err, campground){
                if(err){ req.flash("error","Campground not found.");}
                if(campground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            });
        }
    }
    return {
        isLoggedIn: function(req,res,next){
            isLoggedIn(req,res,next);
        },
        checkCampgroundOwnership: function(req,res,next){
            checkCampgroundOwnership(req,res,next);
        },
        checkCommentOwnership: function(req,res,next){
            checkCommentOwnership(req,res,next);
        }
    };
})();
module.exports = Middleware;