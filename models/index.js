var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/I_messed_up");

module.exports.Profile = require("./profiles");