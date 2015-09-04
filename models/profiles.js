var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var Restaurant = new Schema({
	name: String,
	location: String,
	rating: String
})
var ProfileSchema = new Schema({
	name: String, 
	passwordDigest: String,
	profileFavs: [Restaurant]

})

// var Restaurant = mongoose.model('Restuarant', Restaurant);

var Restaurant = mongoose.model('Restuarant', Restaurant);
var Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;

