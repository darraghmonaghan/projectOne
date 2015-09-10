var express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
session = require('express-session'),

db = require('./models')

var yelp = require("yelp").createClient({
	consumer_key: "s3lPNTsNXkslKK6OOgq3fQ", 
	consumer_secret: "-frcd7rejOgUIURceGKNYlxOqEk",
	token: "jdfwlZuFMbhEPCAYvamHUCySlYg-aSaV",
	token_secret: "PflgYZRBFapq4s6aFwlhFIhikb4"
});



var app = express(),
views = path.join(process.cwd(), "views");

app.use(bodyParser.urlencoded({extended: true}));
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));
app.use(session({secret: "super secret key", resave: false, saveUninitialized: true}));
app.use(function(req,res,next){
	req.login = function (user) {
		req.session.userId = user._id;
	};
	req.currentUser = function (cb) {
		db.Profile.findOne({_id: req.session.userId}, function (err, user){
			req.user = user;
			cb(null, user);
		})
	};
	req.logout = function () {
		req.session.userId = null;
		req.user = null;
	}
	next();
})

var questions = {};

app.get("/", function (req,res) {
	res.sendFile(path.join(views, "index.html"))
})



app.post('/', function (req,res){
	console.log(req.body)
	if(req.body.login === "true") {
		db.Profile.authenticate(req.body.username, req.body.password, function (err, user){
			if(err){
				console.log(err);
				res.redirect("/")}
				else{
					console.log("logged in");
					req.login(user)
					console.log(req.session.userId)
					res.redirect("/home");}
				})
	}
	else{
		db.Profile.createSecure(req.body.username, req.body.password, req.body.zip, function(err, user){
			if(err){return console.log(err);}
			else{
				console.log(user);
				req.login(user);
				res.redirect("/home");
			}
		})
	}
	
})

app.post('/profileFavs', function(req, res){
	console.log(req.body);
	console.log(req.body.name);
	if(req.body.name !== undefined){
		req.currentUser(function(err,user){
			var newRest = {
				name: req.body.name,
				location: req.body.display_address,
				rating: req.body.rating
			};
			// console.log(user)
			user.profileFavs.push(newRest);
			user.save(function(err,success){
				if(err){return console.log(err)}
					console.log("success");
			})
			
		})
		res.send("okay");
	}
})

app.get('/api/profile', function(req,res){
	var profileInfo = {};
	req.currentUser(function(err,user){
		if(err || user === null) {return console.log(err)}
			profileInfo.data = user.profileFavs


		res.send(profileInfo)
	})
})
app.get("/distance", function (req,res){
})

app.get('/change/:location', function (req,res){
	var location = req.params.location;
	console.log(location);
	var data = yelp.search({term: "food", location: location}, function (err, data){
		if(err){console.log(err);};
		res.send(data);
	})
})
app.get('/api/home/:location', function (req,res) {
	var location = req.params.location;
	console.log(req.params)
	var data = yelp.search({term: "food", location: location}, function(err, data) {
		console.log(err);
		res.send(data);

	});
})
app.get('/home', function (req,res) {
	req.currentUser(function(err,user){
		console.log(user)
		if(err || user === null){
			res.redirect("/");
		}else{
			res.sendFile(path.join(views, "home.html"));
		}
	})
})
app.post('/logout', function(req,res) {
	req.logout();
	res.redirect("/");
})

app.listen(3000, function() {
	console.log("Server is running on localhost:3000");
})