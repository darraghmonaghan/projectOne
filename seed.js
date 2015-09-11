var db = require('./models')

// function hey () {
// 	db.Profile.findOne({name: "tori"}, function (err,user) {
// 		if(err){return console.log("what");}
// 		var newRest = {
// 			name: "Alice's",
// 			location: "here",
// 			rating: 4
// 		};
// 		user.profileFavs.push(newRest);
// 		user.save(function(err,success) {
// 			if(err){return console.log(err);}
// 			console.log("success");
// 		});
		
// 		return console.log(user);
// // 		})
// // // 	}

function hey () {
	db.Profile.findOne({name: "tori"},function(err,user){
		if(err){return console.log(err);}
		console.log(user.name)
		user.profileFavs = [];
		user.save(function(err,success) {
			if(err){return console.log(err);}
			console.log('success');
		})
		console.log(user);

	})
}

hey();