var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var url = 'mongodb://localhost:27071/freerider';

/*
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
MongoClient.connect(url, function(err, db) {
    var collection = db.collection('Location');

    assert.equal(null, err);
    console.log("Connected correctly to server");
    
    setInterval(function(){
    collection.find({}, function(err,docs){
    console.log(docs);
    }).sort({_id:-1}).limit(1)}, 500);
});
