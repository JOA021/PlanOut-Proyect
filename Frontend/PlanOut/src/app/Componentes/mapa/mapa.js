let map;
let marker;
let userPosition;
let markersArray = [];
let trafficLayer; 
let directionsService; 
let directionsRenderer;
let AutocompleteService;

async function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    const defaultPosition = { lat: 4.645926, lng: -74.077604 };
    createMap(defaultPosition);   
  }
}

function successCallback(position) {
  window.alert("Recuerda no ingresar el origen porque ya permitiste tu ubicacion")
  userPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  createMap(userPosition);  
}

function errorCallback(error) {
  window.alert('Error al obtener la ubicacion del usuario', error);
  const defaultPosition = { lat: 4.645926, lng: -74.077604 };
  createMap(defaultPosition);
}

function createMap(position) {
  google.maps.importLibrary("maps").then(({ Map }) => {
    map = new Map(document.getElementById("map"), {
      zoom: 11,
      center: position,
      mapId: "my_map",
    });

    trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const origenInput = document.getElementById('origenInput');
    const destinoInput = document.getElementById('destinoInput');
    const calcularRutaButton = document.getElementById('calcularRutaButton');

    calcularRutaButton.addEventListener('click', function () {
      calcularRuta(origenInput.value, destinoInput.value);
    });

    const autocompleteOrigen = new google.maps.places.Autocomplete(origenInput);
    const autocompleteDestino = new google.maps.places.Autocomplete(destinoInput);

    autocompleteOrigen.bindTo('bounds', map);
    autocompleteDestino.bindTo('bounds', map);

    const userMarker = new google.maps.Marker({
      position: position,
      map: map
    });

    markersArray.push(userMarker);

    map.addListener('click', function (event) {
      if (!marker) {
        placeMarker(event.latLng);
        calculateRoute();
      }
    });

    map.addListener('rightclick', function (event) {
      deleteMarkers();
    });
  });
}

function calcularRuta(origen, destino) {
  let origin = origen; 
  if (!origin && userPosition) {
      origin = new google.maps.LatLng(userPosition.lat, userPosition.lng);
  }

  const request = {
    origin: origin,
    destination: destino,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function (response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(response);
      calculateTime(response);
    } else {
      console.error('Error calculando la ruta:', status);
    }
    google.maps.event.addDomListener(window, 'load', initMap);
  });
}

function placeMarker(location) {
  marker = new google.maps.Marker({
    position: location,
    map: map
  });

  markersArray.push(marker);
}
function deleteMarkers() {
  for (let i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
  marker = null;

  directionsRenderer.set('directions', null);
}

function calculateRoute() {
  if (markersArray.length === 2) {
    const request = {
      origin: markersArray[0].getPosition(),
      destination: markersArray[1].getPosition(),
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
        calculateTime(response);
      } else {
        console.error('Error calculating the route:', status);
      }
    });
  }
}

function calculateTime(directionsResult) {
  const route = directionsResult.routes[0]; 

  let totalDuration = 0;
  for (let i = 0; i < route.legs.length; i++) {
    totalDuration += route.legs[i].duration.value; 
  }

  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);
  const seconds = totalDuration % 60;

  const tiempoViajeDiv = document.getElementById('tiempoViaje');
  const tiempoViajeHTML = `Tiempo estimado de viaje: ${hours} horas, ${minutes} minutos, ${seconds} segundos`;

  tiempoViajeDiv.innerHTML = tiempoViajeHTML;

}

initMap();

