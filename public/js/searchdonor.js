// Hardcoding city and country for this example.

var city = "Bngalore";
var country = "India";

// First, create an object containing address and search results count for the city.

/*
If we are getting it from server un comment the below code. 
var getSearchData = function(){
var searchResults = null;
$.ajax({
		'async': false,
        'global': false,
        'url': "http://example.com/data.json",
        'dataType': "json",
        'success': function (data) {
            searchResults = data;
        }
});
alert(searchResults.results[0].area);
}();
*/

//For this example i am hard coding the search results.
var searchResults = [
    {
    	"area":"IndiraNagar",
    	"resultCount":12
    },
    {
    	"area":"Electronic city",
    	"resultCount":5
    },
    {
    	"area":"Varthur",
    	"resultCount":1
    },
    {
    	"area":"Marathahalli",
    	"resultCount":3
    }
    
    ];



//Create an empty object.This is a Global variable.
var citymap ={};


//Function to populate the empty object from search results.This function does not do any thing thing really. We can ommit this OR add some more functionality as needed.
function populatecityMap(){
$.each( searchResults, function( key, value ) {
  var area = value.area; 
  var areaObj = {};
  areaObj.address=area+","+city+","+country;
  areaObj.count=value.resultCount; 
  citymap[area] = areaObj;

});
}

function initMap() {
//Create geo coder object.This is a Global Variable.Note that there is no var before this variable.
  geocoder = new google.maps.Geocoder();
  // Create the map.
  geocoder.geocode( {'address': city+","+country}, function(results, status) {
  
   map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: results[0].geometry.location,//This is hard coded to bangalore,India. Change this to get the lat lang based on city and country.
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  });
  
  
  //Now populate the cityMap object from search results.
  populatecityMap();

  // Construct the circle for each value in citymap.
  // Note: We create circle based on the count variable in citymap.area object. Use radius parameter below to control the size of the circle.
  
  // Loop through each value in citymap object using foreach with a call back to avoid unexpected event queing.
  
  $.each( citymap, function( key, value ) {
// Call google geocoder api to get the lat lang values of each area in citymap.
   geocoder.geocode( {'address': value.address}, function(results, status) {

    if (status === google.maps.GeocoderStatus.OK) {
    // Add the circle for this area to the map.
      var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: results[0].geometry.location,
      radius: Math.sqrt(value.count) * 1000
    });
    } else {
      alert("error"+status);//google geocoder api failed.
    }
  });//End call back for google geo code API.
  
  });//End call back foreach.
  
 }//End function initMap	