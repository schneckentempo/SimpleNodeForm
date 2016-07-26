var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var data = {};
var msgCounter = 1;

//example data
/*data = {
   "msg0" : {
      "firstName" : "Test",
      "lastName" : "Name",
      "message" : "Testmessage",
      "id": 0
   }
}*/

//create parser
var jsonParser = bodyParser.json();

//index-route
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

//provides saved data
app.get('/getdata', function (req, res) {
   res.send(JSON.stringify(data));
})

//inserts new message at the end of existing data
app.post('/insertmsg', jsonParser,  function(req, res){
   if (!req.body)
      return res.sendStatus(400);

   //console.log(JSON.stringify(req.body));

   var reqJson = req.body;
   reqJson.id = msgCounter;

   data["msg" + msgCounter] = reqJson;
   msgCounter++;

   console.log(JSON.stringify(data));
   console.log('----------------------------------------');

   res.send(JSON.stringify(data));
});

//deletes a message from existing data
app.get('/deletemsg/:id', function(req, res){
   var deleteId = req.params.id;

   delete data["msg" + deleteId];

   console.log(JSON.stringify(data));
   console.log('----------------------------------------');

   res.send(JSON.stringify(data));

})

//server start
var server = app.listen(8081, function () {
   var port = server.address().port;

   console.log("Message App listening at %s", port);

})