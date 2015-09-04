var mongoose = require("mongoose");
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
var Restaurant = new Schema({
	name: String,
	location: String,
	rating: String
})
var ProfileSchema = new Schema({
	name: String, 
	passwordDigest: String,
	zip: Number,
	createdAt: Date,
	profileFavs: [Restaurant]

})

ProfileSchema.statics.createSecure = function(name, password, zip, cb) {
	var _this = this;
	bcrypt.hash(password, 10, function (err,hash){
		var user = {
			name: name,
			passwordDigest: hash,
			zip: zip,
			createdAt: Date.now()
		};
		_this.create(user, cb)
	});
}

ProfileSchema.statics.authenticate = function(name, password, cb) {
	this.findOne({name: name}, function (err,user){
		if(user === null) {
			cb("can\'t find user with that name", null);
		}else if (user.checkPassword(password)){
			cb(null,user);
		}else{
			cb("password incorrect", user);
		}
	});
};

ProfileSchema.methods.checkPassword = function(password) {
	return bcrypt.compareSync(password, this.passwordDigest);
}


var Restaurant = mongoose.model('Restuarant', Restaurant);


var Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;

