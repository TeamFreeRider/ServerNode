//console.time('before insert');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/location");


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
    { collection : 'Blue_point'});

var Location = mongoose.model('Blue_point', LocationSchema);

//console.timeEnd('before insert');
//console.time('Insert Method');

/*
//I just checked if this db works fine. Ignore this insertion code.
var location = new Location();
location.x = 100;
location.y = 44;
location.save(function(err){
    if(err) console.log("Something went wrong while saving the thing");
    else console.log("successfully saved");
});
*/
//console.timeEnd('Insert Method');
//console.time('Find Method');
 
//constantly check out database every 0.5 secs
setInterval(function(){
    Location.find({}, function(err,docs){
    console.log(docs);
}).sort({_id:-1}).limit(1)}, 500);



//console.timeEnd('Find Method');
