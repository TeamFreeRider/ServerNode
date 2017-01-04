var MongoClinet = require('mongodb').MongoClient
    , assert = require('assert');

var url = 'mongodb://localhost:27017/db';



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

//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function(){ console.log("we're connected"); });


//constantly check out database every 0.5 secs
MongoClient.connect(url, function(err, db) {
    assert.equal(null,err);
    db.createCollection('Blue_point', function(err, collection) {});

    var collection = db.collection('Blue_point');
    
    var findDocuments = function(db, callback) {
	var collection = db.collection('Blue_point');
        setInterval(function(){
	    collection.find({}, function(err,docs){
    	        console.log(docs);
            }).sort({_id:-1}).limit(1)}, 500);
    }
    db.close();
});
