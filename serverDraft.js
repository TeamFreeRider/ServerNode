var mongoose = require('mongoose');
mongoose.connect("mongodb://celine:0522@ds157677.mlab.com:57677/freerider");

var db = mongoose.connection;
var Schema = mongoose.Schema;

var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";

var LocationSchema = new Schema({
    'x': Number,
    'y': Number},
    { collection : 'Location'});

var Location = mongoose.model('Location', LocationSchema);

//testing variable... it is not permanent
var test_user = new Array(2); test_user[0] = 100; test_user[1] = 100;
var test_car1 = new Array(2); test_car1[0] = 853; test_car1[1] = 128;
var test_car2 = new Array(2); test_car2[0] = 573; test_car2[1] = 234;

http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
  res.writeHead(200, {"Content-Type": "text/plain"});
  //res.write("FreeRider Server");

  console.log("Server Activated");
  var result = Find_NearestCar(test_user,test_car1,test_car2);
  console.log(result.toString());

  res.end(result);
}).listen(8080);

Location.find({}, function(err,docs){
    console.log(docs);
});//printing out the database data

function Find_NearestCar(arr_user,arr_car1,arr_car2)
//do not know what type of datatype that the raspi will send(Suppose that it is an array)
{
  var Distanceresult = [];
  //[0] : x,[1] : y
  Distanceresult[1] = Math.sqrt(Math.pow(arr_user[0] - arr_car1[0],2) + Math.pow(arr_user[1] - arr_car1[1],2));
  Distanceresult[2] = Math.sqrt(Math.pow(arr_user[0] - arr_car2[0],2) + Math.pow(arr_user[1] - arr_car2[1],2));

  if(Distanceresult[1] < Distanceresult[2])//the shortest distance gets activated
  {
    return "1";//activate car1
  }
  else
  {
    return "2";//activate car2
  }
}
