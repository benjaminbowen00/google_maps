var MapWrapper = function(container, coords, zoom){
  var container = document.getElementById('main-map');

  this.googleMap = new google.maps.Map(container,
    {
    center: coords,
    zoom: zoom
  });
  this.markers = [];
}

MapWrapper.prototype.addMarker = function(coords){
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  let label = stringOfCoords(coords);
  addInfoWindow(marker, label);
  marker.setAnimation(null);

  this.markers.push(marker);
}

var stringOfCoords = stringOfCoordsClosed()
function stringOfCoordsClosed(coords){
  var counter = 0;
  return function(coords){
    counter++
    let lat = coords['lat'];
    let long = coords['lng'];
    return `This is marker number ${counter} on the map. The location is latitiude: ${lat.toFixed(4)}, longitude: ${long.toFixed(4)}`;
  }
}

function addInfoWindow(marker, message) {

  var infoWindow = new google.maps.InfoWindow({
    content: message
  });

  google.maps.event.addListener(marker, 'click', function () {
    infoWindow.open(this.googleMap, marker);
  });
}

MapWrapper.prototype.bounceMarkers = function(){
  this.markers.forEach(function(marker){

      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    })
      // marker.setAnimation(google.maps.Animation.BOUNCE);
  // })
}


MapWrapper.prototype.recentreMapChicago = function(){
  // var latLng = new google.maps.LatLng(41.87, -87.63);
    latLng = {lat:41.87, lng:-87.63};
  console.log(latLng);
    this.googleMap.setCenter(latLng);
}

MapWrapper.prototype.recentreOnWhereIAm = function(){

  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    // myLocation = new google.maps.LatLng(lat, long);
    myLocation = {lat:lat, lng:long};
    console.log(myLocation);
    this.googleMap.setCenter(myLocation);
    this.googleMap.setZoom(15);

    myCoords = {lat: lat, lng: long};
    this.addMarker(myCoords);
  }.bind(this));

  // let lat = navigator.geolocation.getCurrentPosition(function(position) {
  //   return position.coords.latitude});
  //   console.log(lat);

  // var latLng = new google.maps.LatLng(coordsArray[0], coordsArray[1]);
  // this.googleMap.setCenter(latLng);
}

MapWrapper.prototype.addClickEvent = function(){
  google.maps.event.addListener(this.googleMap, 'click', function(event){

    let lat = event.latLng.lat();
    let lng = event.latLng.lng();
    coords = {lat: lat, lng: lng};

    this.addMarker(coords);
  }.bind(this))
}

// MapWrapper.prototype.addClickEvent = function(){
//   google.maps.event.addListener(this.googleMap, 'click', getCoordsAddMarker.call(this))
// }
//
// var getCoordsAddMarker function(event){
//
//   let lat = event.latLng.lat();
//   let lng = event.latLng.lng();
//   coords = {lat: lat, lng: lng};
//
//   this.addMarker(coords);
// }
