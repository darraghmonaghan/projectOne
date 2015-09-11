var mongoose = require("mongoose");
var env = process.env;
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/project_one" )

module.exports.Profile = require("./profiles");