var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost/localDB';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

    setInterval(function(){
      findDocuments(db, function() {
      db.close();
      });
    }, 500);
});


var findDocuments = function(db, callback) {
  // Get the documents collection
    var collection = db.collection('Blue_point');
  // Find some documents
        collection.find({}).sort({'_id':-1}).limit(1).toArray(function(err, docs) {
	console.log(docs)
	callback(docs);
        });      
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
