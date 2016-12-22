var mongoose = require('mongoose');

mongoose.connect("mongodb://celine:0522@ds157677.mlab.com:57677/freerider");

//create object and instance
var locationSchema = mongoose.Schema({

    x : Number,
    y : Number

});

var Location = mongoose.model('locations',locationSchema);

Location.findOne().sort({x:-1});



var db = mongoose.connection;

db.once("open",function() {

    console.log("db connected");

});



db.on("error",function(err) {

    console.log("db error :",err);

});
