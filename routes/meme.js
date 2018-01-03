var express = require("express"),
    router = express.Router();
var Meme = require("../models/meme")
var middleware = require("../middleware/index")



//INDEX -- Show all Memes
router.get("/", function(req,res){
    //Get all Memes from db
    Meme.find({}, function(err, allMemes){
        if (err){
            console.log(err)
        } else{
            res.render("memes/index", {memes:allMemes, currentUser:req.user} );
        }
    })
    
    

})

router.post("/", function(req,res){
    //get data from form and add to ampground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newMeme = {name: name, image: image, description:desc, author:author}
    
    //Create a new campground and save to DB
    Meme.create(newMeme, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else{
            //redirect back to campgrounds page
            console.log(newlyCreated)
            res.redirect("/memes")
        }
        
    })
    
    
    
    
})

//NEW - Show form to create a new memes
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("memes/new")
})

//SHOW - show selected item

router.get("/:id", function(req, res){
    //find the campmground with provided ID
    
    Meme.findById(req.params.id).populate("comments").exec(function(err, foundMeme){
        if(err){
            console.log(err)
        } else {
            // console.log(foundMeme)
            res.render("memes/show", {memes:foundMeme})
        }
    })
})

// EDIT MEME ROUTE

router.get("/:id/edit",middleware.checkMemeOwnership, function(req,res){

    Meme.findById(req.params.id, function(err, foundMeme){
        if(err){
            console.log(err)
        }
        res.render("memes/edit", {memes: foundMeme})
        
    });
    
    
})

// UPDATE MEME ROUTE

router.put("/:id",middleware.checkMemeOwnership, function(req,res){
    //find and update the correct campground
    
    Meme.findByIdAndUpdate(req.params.id, req.body.meme, function(err, updateMeme){
        if(err){
            res.redirect("/memes")
        } else{
            res.redirect("/memes/"+ req.params.id);
        }
    })
    

})

// DESTROY MEME ROUTE

router.delete("/:id", middleware.checkMemeOwnership, function(req,res){
    Meme.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/back")
        } else{
            req.flash("success", "Meme deleted")
            res.redirect("/memes")
        }
    })
})





module.exports = router;

