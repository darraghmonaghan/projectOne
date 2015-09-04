var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	db = require('./models')

var app = express(),
	views = path.join(process.cwd(), "views");

app.use(bodyParser.urlencoded({extended: true}));
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

app.get("/", function (req,res) {
	res.sendFile(path.join(views, "index.html"))
})

app.listen(3000, function() {
	console.log("Server is running on localhost:3000");
})