// All middleware goes here
var middlewareObj = {};
var Comment = require("../models/comment")
var Meme = require("../models/meme")

middlewareObj.checkMemeOwnership = function(req,res,next){
    
        //is user logged in ?
    if (req.isAuthenticated()){
        // does user own the campground ?
        
        Meme.findById(req.params.id, function(err, foundMeme){
        if (err){
            req.flash("error", "Meme not found")
            res.redirect("/back")
        } else {
            if (foundMeme.author.id.equals(req.user._id)){
                res.render("memes/edit", {memes: foundMeme})
            }else{
                req.flash("error", "You don't have permission to do that");
                res.redirect("back")
            }
            
        
        }
    })
    }
    //if not, redirect
    else{
        req.flash("error", "You need to be logged in first to do that")
        res.redirect("back")
        
    }
}



middlewareObj.checkCommentOwnership = function(req,res,next){
        //is user logged in ?
    if (req.isAuthenticated()){
        // does user own the comment ?
        
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
            res.redirect("/back")
        } else {
            if (foundComment.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "You don't have permission to do that")
                res.redirect("back")
            }
            
        
        }
    })
    }
    //if not, redirect
    else{
        req.flash("error", "You need to be logged in first to do that")
        res.redirect("back")
        
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    //middleware
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be log in first!")
    res.redirect("/login")
}


module.exports = middlewareObj;