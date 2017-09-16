var express     = require('express'),
    bodyParser  = require("body-parser"),
    path        = require("path"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    methodOverride = require("method-override"),
    localStrategy = require("passport-local"),
    Campground  = require("./models/Campground"),
    Comment     = require("./models/Comment"),
    seedDB      = require("./seeds"),
    User        = require("./models/User"), 
    flash       = require("connect-flash"), 
    app         = express();

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
// mongoose.Promise = global.Promise;
//============= INIT
mongoose.connect("mongodb://onetrueyeri:password@localhost:27012/yelp_camp?authSource=admin", {useMongoClient: true}); //do more research into doing this a better way
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
// seedDB(); //seed the db
//passport authentication init
app.use(require("express-session")({
    secret: "Taeyeon is the best singer",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//pass user for header statements on each route
app.use(function(req,res,next){
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); //important if this isn't there it will stop
});
//init route files
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds", campgroundRoutes);
//listen for connection
app.listen(3000, function(){
    console.log("The Yelp Camp server has started.");
});