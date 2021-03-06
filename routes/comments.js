// ================================
//COMENTS ROUTES
// ================================

var express = require("express"),
    router = express.Router({mergeParams: true});
    
var Meme = require("../models/meme")
var Comment = require("../models/comment")
var middleware = require("../middleware")

//new comment
router.get("/new",middleware.isLoggedIn, function(req, res){
    Meme.findById(req.params.id, function(err, memes){
        if (err){
            console.log(err)
        } else{
            res.render("comments/new", {memes:memes})
        }
    })
})

//post new comment
router.post("/",middleware.isLoggedIn, function(req,res){
    //lookup memes using id
    
    Meme.findById(req.params.id, function(err, meme) {
        if(err){
            console.log(err)
            res.redirect("/memes")
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something wnet wrong")
                    console.log(err)
                } else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    meme.comments.push(comment);
                    meme.save();
                    req.flash("Sucess", "Sucesffully added comment")
                    res.redirect("/memes/"+ meme._id)
                    
                    }
            })
        }
    })
    
})

//COMMENT EDIT
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back")
        } else{
            res.render("comments/edit", {meme_id: req.params.id, comment: foundComment})
        }
    })
    
})

//COMMENT UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err){
            res.redirect("back")
        } else{
            res.redirect("/memes/" + req.params.id)
        }
    })
})


// DELETE COMMENT
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back")
        } else{
            req.flash("success", "Comment deleted")
            res.redirect("/memes/" + req.params.id)
        }
    })
})




module.exports = router;