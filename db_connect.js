var mongoose = require('mongoose');

mongoose.connect("mongodb://celine:0522@ds157677.mlab.com:57677/freerider");



var db = mongoose.connection;

db.once("open",function() {

    console.log("db connected");

});



db.on("error",function(err) {

    console.log("db error :",err);

});



//create Object and make Instance

var locationSchema = mongoose.Schema({

    x : Number,

    y : Number

});

