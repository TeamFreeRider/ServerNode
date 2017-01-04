var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost/localDB';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

	findDocuments(db, function() {
	    db.close();
	});
});


var findDocuments = function(db, callback) {
  // Get the documents collection
    var collection = db.collection('Blue_point');
  // Find some documents
    setInterval(function(){
        collection.find({}).sort({'_id':-1}).limit(1).toArray(function(err, docs) {
	console.log(docs)
	callback(docs);
        })
    }, 500);      
}


/*

var findDocuments = function(db, callback) {
  
  // Get the documents collection
    var collection = db.collection('Blue_point');
  // Find some documents

    collection.find({}, function(err,docs){
    console.log(docs);
    }).sort({'_id':-1}).limit(1)});

*/
