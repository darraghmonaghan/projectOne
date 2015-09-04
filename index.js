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



app.post('/', function (req,res){
	console.log(req.body)
	if(req.body.login === "true") {
		console.log("true")
		db.Profile.authenticate(req.body.username, req.body.password, function (err, user){
			if(err){
				console.log(err);
				res.redirect("/")}
			else{
				console.log("logged in");
				res.redirect("/home");}
		})
	}
	else{
		db.Profile.createSecure(req.body.username, req.body.password, req.body.zip, function(err, user){
			if(err){return console.log(err);}
			else{
				console.log(user);
				res.redirect("/home");
			}
		})
	}
	
})

app.get('/home', function (req,res) {
	res.sendFile(path.join(views, "home.html"))
})

app.listen(3000, function() {
	console.log("Server is running on localhost:3000");
})