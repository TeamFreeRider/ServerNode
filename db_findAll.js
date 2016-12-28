//console.time('before insert');

var mongoose = require('mongoose');
mongoose.connect("mongodb://celine:0522@ds157677.mlab.com:57677/freerider");


var db = mongoose.connection;
var Schema = mongoose.Schema;


db.once("open",function() {
    console.log("db connected");
});

db.on("error",function(err) {
    console.log("db error :",err);
});


var LocationSchema = new Schema({
    'x': Number,
    'y': Number},
    { collection : 'Location'});

var Location = mongoose.model('Location', LocationSchema);

//console.timeEnd('before insert');
//console.time('Insert Method');


//I just checked if this db works fine. Ignore this insertion code.
var location = new Location();
location.x = 3;
location.y = 10;
location.save(function(err){
    if(err) console.log("Something went wrong while saving the thing");
    else console.log("successfully saved");
});

//console.timeEnd('Insert Method');
//console.time('Find Method');


Location.find({}, function(err,docs){
    console.log(docs);
});

//console.timeEnd('Find Method');

