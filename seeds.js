var mongoose = require("mongoose");
var Campground = require("./models/Campground");
var Comment = require("./models/Comment");
var data = [
    {
        name: "Paradise",
        image: "https://s-media-cache-ak0.pinimg.com/736x/96/50/77/9650770723358f4f30377e7d3cff7979--mackenzie-river-river-trail.jpg",
        description: "Lorem ipsum dolor sit amet, cras egestas, nec sed consectetuer suspendisse risus luctus metus, metus fames hac massa erat imperdiet, aliquam felis ut pede porttitor pretium, ut dolor massa. Nascetur donec, at condimentum ornare in quisque lacinia lacus. Non mollis orci a, condimentum pellentesque sociosqu nonummy commodi mauris egestas, praesent sed elementum, a mauris dignissim. Corrupti accumsan, lacus sem et, et nam leo penatibus, ipsum morbi tellus orci consectetuer lectus ullamcorper. Parturient diam lorem scelerisque, neque nascetur nec vitae at aliquet aliquam, vestibulum orci eu odio lorem, duis mauris parturient eu donec. Sollicitudin donec maxime, eget eu donec leo arcu, a id pellentesque est."
    },
    {
        name: "Pickwick Dam",
        image: "http://pickwick-dam.com/wp-content/uploads/2015/08/17991101764_fcb19c7311_k.jpg",
        description: "Lorem ipsum dolor sit amet, cras egestas, nec sed consectetuer suspendisse risus luctus metus, metus fames hac massa erat imperdiet, aliquam felis ut pede porttitor pretium, ut dolor massa. Nascetur donec, at condimentum ornare in quisque lacinia lacus. Non mollis orci a, condimentum pellentesque sociosqu nonummy commodi mauris egestas, praesent sed elementum, a mauris dignissim. Corrupti accumsan, lacus sem et, et nam leo penatibus, ipsum morbi tellus orci consectetuer lectus ullamcorper. Parturient diam lorem scelerisque, neque nascetur nec vitae at aliquet aliquam, vestibulum orci eu odio lorem, duis mauris parturient eu donec. Sollicitudin donec maxime, eget eu donec leo arcu, a id pellentesque est."
    },
    {
        name: "Mazama",
        image: "https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1440478008/campground-photos/csnhvxn0qcki2id5vxnc.jpg",
        description: "Lorem ipsum dolor sit amet, cras egestas, nec sed consectetuer suspendisse risus luctus metus, metus fames hac massa erat imperdiet, aliquam felis ut pede porttitor pretium, ut dolor massa. Nascetur donec, at condimentum ornare in quisque lacinia lacus. Non mollis orci a, condimentum pellentesque sociosqu nonummy commodi mauris egestas, praesent sed elementum, a mauris dignissim. Corrupti accumsan, lacus sem et, et nam leo penatibus, ipsum morbi tellus orci consectetuer lectus ullamcorper. Parturient diam lorem scelerisque, neque nascetur nec vitae at aliquet aliquam, vestibulum orci eu odio lorem, duis mauris parturient eu donec. Sollicitudin donec maxime, eget eu donec leo arcu, a id pellentesque est."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log("removed campgrounds");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else{
                    console.log("added a campground!");
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){ console.log(err);}
                        campground.comments.push(comment);
                        campground.save();
                    })
                }
            })
        });           
    });
     
}
module.exports = seedDB;