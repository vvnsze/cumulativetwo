var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");
var request = require('request');
var rp = require('request-promise');
// var angular = require('angular');

//url we use to query search https://data.ct.gov/resource/y6p2-px98.json?
//https://data.ct.gov/resource/y6p2-px98.json?

app.use(cors());

app.use("/node_modules", express.static('node_modules'));
app.use(express.static('./client'));


app.use(bodyParser.json());


// app.get('/search', function(req, res){
//   var url = "https://data.ct.gov/resource/y6p2-px98.json?item=guava"; //not just guava, need to retrieve an object with params from client side
//   console.log('+++line 27 inside /search');
//   rp(url).then(function(data){
//     // console.log("line29 data for /search", data[0]);
//     // console.log("+++line 30 type of data", typeof data);
//     res.send(JSON.parse(data));
//   }).catch(function(error){
//     console.error('+++line29: There was an issue in app.get/search')
//   });
// });


app.get('/fooditem', function(req, res){
  var foodItem = "category=" + req.query.item;

  var url = "https://data.ct.gov/resource/y6p2-px98.json?" + foodItem;
  rp(url).then(function(data){
    // console.log("line29 data for /search", data);
    // console.log("+++line 30 type of data", typeof data);
    res.send(JSON.parse(data));
  }).catch(function(error){
    console.error('+++line29: There was an issue in app.get/search')
  });
});



app.set('port', process.env.PORT || 3000);

app.listen(app.get('port') , function(){
  console.log('+++line 13 port is listening');
});
