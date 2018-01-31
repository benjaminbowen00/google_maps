var initialize = function(){
  var container = document.getElementById("main-map");
  var center = {lat: 51.507351, lng:-0.127758}
  var  otherPlace = {lat: 51.503038, lng:0.003154}

  var mainMap = new MapWrapper(container, center, 11);
  mainMap.addMarker(center);
  mainMap.addMarker(otherPlace);

  // mainMap.addInfoWindow();

  mainMap.addClickEvent();

  var button = document.getElementById("button-bounce-markers");
  button.addEventListener('click', mainMap.bounceMarkers.bind(mainMap));

  var buttonRecentre = document.getElementById("button-recenter");
  buttonRecentre.addEventListener('click', mainMap.recentreMapChicago.bind(mainMap));

  var buttonWhereAmI = document.getElementById("button-where-am-i");
  buttonWhereAmI.addEventListener('click', mainMap.recentreOnWhereIAm.bind(mainMap));

}


















window.addEventListener('load', initialize);
