var express = require("express"),
    router = express.Router(),
    passport = require("passport");


//root route
router.get("/", function(req, res){
    res.render("landing")
})

var User = require ("../models/User")

//==================================
// AUTH ROUTES
//==================================

// show register form
router.get("/register", function(req,res){
    res.render("register")
})

//handle sign up logic

router.post("/register", function(req,res){
    var newUser = new User ({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message)
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to La Memeria " +user.username)
            res.redirect("/memes");
        });
    });
});

//login route
router.get("/login", function(req, res){
    res.render("login")
});

//handling login logic
router.post("/login", passport.authenticate("local",
    {
        
        successRedirect: "/memes",
        failureRedirect: "/login",
    }), function(req,res){
});

//logout route
router.get("/logout", function(req,res){
   req.logout();
   req.flash("success","logged you out")
   res.redirect("/memes")
});



module.exports = router;