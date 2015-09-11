var locat = "San Francisco";
var restInfo = {};
var ind = [];
var rad;
var map;
var markers = [];
var restaurantLatLng = {};
var LatLng = { lat: 37.78, lng: -122.44};
var questions_index;
var questions = [
	{question: "Do you Want a bagel?", key: "bagels"},
	{key:"beer_and_wine", question: "Something to drink? ... Beer?... Wine?"},
	{key:"foodtrucks", question: "Something quick? try a food truck?"},
	{key:"cheese", question: "do you like cheese?"},
	{key:"bakeries", question: "Sweet tooth? Check out a bakery?"},

]
$(document).ready( function (){
	getMap();

	$('#logBtn').click(function(e){
		e.preventDefault();
		$.post("/profileFavs", restInfo, function(res){
			console.log(res)
		})

	})

	$('#radiusBtn').click(function(e){
		e.preventDefault();
		rad = $("#rad").val();
		$.get('radChange/' +locat+ "/" + rad, function(res){
			console.log(res);
			infoHandler(res);
		})
		$('#radiusBtn').val('');
	})

	$("#questionBtn").click(function (e){
		$("#question").empty();
		questionPopulate();
	})

	$('#nahBtn').click(function(e){
		$("#question").empty();
		questionPopulate();

	})

	$('#yupBtn').click(function(e){
		var type = questions[questions_index].key;
		$.get("query/" + locat+'/'+type, function (res){
			infoHandler(res);
			positionHandler();
			
		})
		



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
			
			infoHandler(res);
			positionHandler(res);
		}) 
		
	})

	$('#locbtn').click(function(e){
		e.preventDefault()
		loc = $("#loc").val();
		if(loc !== ""){
			locat = loc
			locHandler();
			$.get("change/" + locat, function(res){
				infoHandler(res);});
				positionHandler();
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
			console.log(res)
			var index = Math.floor(Math.random() * res.businesses.length -1);
			restInfo.name = res.businesses[index].name;
			restInfo.rating = res.businesses[index].rating;
			restInfo.reviews = res.businesses[index].review_count;
			restInfo.display_address = res.businesses[index].location.display_address;
			restInfo.latitude = res.businesses[index].location.coordinate.latitude
			restInfo.longitude = res.businesses[index].location.coordinate.longitude;
			console.log(restInfo);
			renderRandom(restInfo);
			return(restInfo)

		}

function questionPopulate(){

		questions_index = Math.floor(Math.random() * questions.length);
		if (ind.length === questions.length){ind = []; questionPopulate();}
		else if(ind.indexOf(questions_index) === -1){
				ind.push(questions_index);
				var data = { query: questions[questions_index].question}
				var template = _.template($("#questionTemplate").html())
				var questHtml = template(questions[questions_index]);
				console.log(questHtml);
				$('#question').append(questHtml);
			} 
			else {
				questionPopulate();
			}
	}
function getMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: LatLng,
    zoom: 11
  });
  console.log("sanity")
	

		 var marker = new google.maps.Marker({
    position: LatLng,
    map: map,
    title: "HEYO"
})
		markers.push(marker)
marker.setMap(map);
};

function locHandler () { 
		var locArray = $('#loc').val().split(" ");
		var addr = locArray.join("+");
		$.get("http://maps.googleapis.com/maps/api/geocode/json?", { "address" : addr}, function (data) {
			LatLng = data.results[0].geometry.location;
			
		getMap();
		})
}

function positionHandler () {
	markers = [];
	var latitude = restInfo.latitude;
	var longitude = restInfo.longitude;
	restaurantLatLng = { lat: latitude, lng: longitude};
	var marker = new google.maps.Marker({
    		position: restaurantLatLng,
    		map: map,
   			title: restInfo.name
		})
	markers.push(marker)
setMapOnAll(map);
console.log("markerend")
			
}
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}




	
