var locat = "San Francisco";
var restInfo = {};

$(document).ready( function (){

	$('#logBtn').click(function(e){
		e.preventDefault();
		$.post("/profileFavs", restInfo, function(res){
			console.log(res)
		})

	})

	$('#radiusBtn').click(function(e){
		e.preventDefault();
		var rad = $("#rad").val();
		$.get('radChange/' +locat+ "/" + rad, function(res){
			console.log(res);
			infoHandler(res);
		})
		$('#radiusBtn').val('');
	})



	$("#profileBtn").click(function(e){
		$.get("/api/profile", function (res){
			$('#profileFavs').empty()
			var profileTemplate = _.template($("#pfTemplate").html());
			res.data.forEach(function(el) {
				var favHtml = profileTemplate(el);
				$('#profileFavs').append(favHtml);
			} )
		})
	})

	$('#random').click( function(e){
		console.log(locat)
		$.get('api/home/' + locat, function (res){
			console.log(res)
			infoHandler(res);
		}) 
		
	})

	$('#locbtn').click(function(e){
		e.preventDefault()
		loc = $("#loc").val();
		if(loc !== ""){
			locat = loc
			$.get("change/" + locat, function(res){
				infoHandler(res);});
		};
		$('#loc').val("");
});

});

function renderRandom(restInfo){
	var template = _.template($("#restaurant-template").html());
	var restHtml = template(restInfo);
	$('#rest-ul').html("");
	$('#rest-ul').append(restHtml);


}
function infoHandler (res) {
			restInfo = {};

			var index = Math.floor(Math.random() * (res.businesses.length - 1));
			console.log(index)
			restInfo.name = res.businesses[index].name;
			restInfo.rating = res.businesses[index].rating;
			restInfo.reviews = res.businesses[index].review_count;
			restInfo.display_address = res.businesses[index].location.display_address;
			renderRandom(restInfo);
			return(restInfo)

		}


	
