var express = require("express");
var app = express(); 
var mongojs = require("mongojs");
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require("body-parser");

//IN New York!!!

// app.get("/", function(req,res){
// 	// send yo info
// 	res.send("Hello World!");
// });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res) {
	console.log("I received a GET request, sending data");

	//---USING MONGO DATABASE---//
	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
	//---USING MONGO DATABASE---//

	/* HARD CODED!!! WE WANT TO USE MONGO
	person1 = {name: "Mark", email: "m@m.com", number: "(222)-222-2222"};
	person2 = {name: "Lisa Simpson", email: "1@m.com", number: "(212)-222-2222"};
	person3 = {name: "Bill", email: "b@m.com", number: "(222)-222-2223"};

	contacts = [person1, person2, person3];
	//take info and set it up in JSON formate
	res.json(contacts);
	*/
});

app.post("/contactlist", function(req, res){
	console.log(req.body);
	db.contactlist.save(req.body, function(err, docs){
		res.json(docs);
	});

});

app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findAndModify(
	{ query: {_id: mongojs.ObjectId(id)}, 
      update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
      new: true 
	}, function(err, doc){
    res.json(doc);
   });
});



app.listen(3000); //ONLY LISTEN TO HTTP REQUESTS AT THIS POERT
console.log("Server running on port 3000");
