var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    flash                   = require("connect-flash"),
    seedDB                  = require("./seeds"),
    methodOverride          = require("method-override"),
    User                    = require("./models/User"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");


//requiring routes
var commentRoutes = require("./routes/comments"),
    memesRoutes = require("./routes/meme"),
    indexRoutes = require("./routes/index");
    
// seed Database
// seedDB();
app.use(flash());
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect ("mongodb://brian:candy@ds137957.mlab.com:37957/memeria");
// mongoose.connect('mongodb://localhost/memeria_v12');


var Meme = require("./models/meme.js")
var Comment = require("./models/comment.js")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static(__dirname+"/public"))
app.use(methodOverride("_method"));


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error =req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/", indexRoutes);
app.use("/memes/:id/comments", commentRoutes);
app.use("/memes", memesRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started!!");
})