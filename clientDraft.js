const SerialNum = 1;// car1 : 1, car2 : 2
var Received = 0; //if it is 0, it is referred as error
var Activate = false;
var http = require('http');
var options = {
    hostname: 'localhost',
    port: '8080',
  };
function handleResponse(response) {
  var serverData = '';
  response.on('data', function (chunk) {
    console.log("alpha");
    Received += chunk;
    Received = Number(Received);
  });

  response.on('end', function () {
    console.log("beta");
    console.log(Received.toString());

    if(SerialNum == Received)
      {Activate = true;}
  });
}
http.request(options, function(response){
  handleResponse(response);
}).end();
