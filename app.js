var express     = require('express'),
    bodyParser  = require("body-parser"),
    path        = require("path"),
    mongoose    = require("mongoose"),
    app         = express();
/**
 * Once done the tutorial look into adding features for receiving pictures from my imgur
 * AS well as uplading them to imgur (find a way to determine that it is yeri)
 */
// mongoose.Promise = global.Promise;
mongoose.connect("mongodb://onetrueyeri:password@localhost:27017/admin", {useMongoClient: true}); //do more research into doing this a better way
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req,res) {
   res.render("landing");
});


//schema setup

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//   name: "Granite Hill", 
//   image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"
// }, function(err, campground){
//   if(err){
//       console.log(err);
//   } else {
//       console.log("NEWLY CREATED CAMPGROUND");
//       console.log(campground);
//   }
// });

app.get("/campgrounds", function(req, res) {   
//    res.render("campgrounds", {campgrounds: campgrounds});
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: campgrounds});
    }
  })
});

app.post("/campgrounds", function(req,res) {
  //get data from form and add to campgrounds array
  //redirect back to campgrounds page
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name:name,image:image};
  Campground.create(newCampground, function(err, campground){
    if(err){
      console.log(err);
    } else {
      console.log(campground);
    }
  });
  res.redirect("/campgrounds"); //defaults to get request
});
app.get("/campgrounds/new", function(req,res) {
  res.render("new.ejs");
});
app.listen(3000, function(){
  console.log("The Yelp Camp server has started.");
})