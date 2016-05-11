searchresults = function(){
//local variables.
var city;
var country='India';
var zoomlevel = 12;
var mapEle;
var searchResults;

var citymap ={};

//initialise local variables.
init = function(config){
	searchResults = config.results;
	mapEle = config.mapEle;
	city=config.city;
	state=config.state;
	zoomlevel = config.zoomlevel || zoomlevel;

}

//Function to populate the empty object from search results.This function does not do any thing thing really. We can ommit this OR add some more functionality as needed.
function populatecityMap(){
$.each( searchResults, function( key, value ) {
  var area = value.area; 
  var areaObj = {};
  areaObj.address=area+","+city+","+country;
  //areaObj.count=value.resultCount; 
  citymap[area] = areaObj;

});
}

var loadMap = function(){
	//Create geo coder object.This is a Global Variable.Note that there is no var before this variable.
  geocoder = new google.maps.Geocoder();
  // Create the map.
  geocoder.geocode( {'address': city+","+country}, function(results, status) {
  
  //load the map for the search city and state.
   map = new google.maps.Map(document.getElementById(mapEle), {
    zoom: zoomlevel,
    center: results[0].geometry.location,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  });
  
  
  //Now populate the cityMap object from search results.
  populatecityMap();



  
  // Loop through each value in citymap object using foreach with a call back to avoid unexpected event queing.
  
  $.each( citymap, function( key, value ) {
// Call google geocoder api to get the lat lang values of each area in citymap.
   geocoder.geocode( {'address': value.address}, function(results, status) {

    if (status === google.maps.GeocoderStatus.OK) {
    // Add the circle for this area to the map.
     /* var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: results[0].geometry.location,
      radius: Math.sqrt(value.count) * 1000
    });*/
    //Add a donation marker
    var marker = new google.maps.Marker({
    	position: results[0].geometry.location,
    	icon: '../img/bdropicon.png',
    	map: map
 	 	});
    map.setCenter(results[0].geometry.location);
    } else {
      alert("error"+status);//google geocoder api failed.
    }
  });//End call back for google geo code API.
  
  });//End call back foreach.
  
 };//End function loadMap
 	
return {
	loadMap:loadMap,
	init:init
	}
	
}();