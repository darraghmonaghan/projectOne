var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project_one");

module.exports.Profile = require("./profiles");