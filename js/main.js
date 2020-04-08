
// WEER

const api = {
  key: "8768a931969cbc7be55e121b70068007",
  base: "https://api.openweathermap.org/data/2.5/"
 
}

// WEER: met deze code werkt het searchbox
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}



// WEER: deze functie zorgt ervoor dat de ingevoerde locatie in de searchbox de locatie, weer, datum etc aanpast in de class "midden".  
function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}


// WEER: deze functie zorgt ervoor dat de huidige datum van het land in beeld komt na het invoeren van een locatie in de searchbox.
function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}







// MAP


// MAP: 
L.mapbox.accessToken = 'pk.eyJ1IjoiZWxseWJlbCIsImEiOiJjanR3OGNteDMxcHdjM3pxbmZtMjdlbmYyIn0.r8QScIIe2JOPavJfo2adiw';
var geocoder = L.mapbox.geocoder('mapbox.places'),
    map = null;

// MAP: deze code bepaald de stijl en de locatie van mijn map
var map = L.mapbox.map('mapbox')
    .setView([51.122632, 15.604547], 4.4)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));


var featureLayer = L.mapbox.featureLayer()
    .addTo(map);


// both versions to add the featurelayer work

function showMap(err, data) {
    // The geocoder can return an area, like a city, or a
    // point, like an address. Here we handle both cases,
    // by fitting the map bounds to an area or zooming to a point.
    if (!map) {
        map = L.mapbox.map('mapbox');
    }

    if (data.lbounds) {
        map.fitBounds(data.lbounds);
    } else if (data.latlng) {
        map.setView([data.latlng[0], data.latlng[1]], 12);
    }
}




// MAP: deze code zorgt ervoor dat de zoek searchbox werkt. bij het invoeren van een locatie gaat de website gelijk naar de locatie toe.

function geocodeThis() {
    var text = document.getElementById('search-box').value;
    if (text.length >= 5) {
        geocoder.query(text, showMap);
    }
}


// MAP: save places
var geojson = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [12.568337, 55.676098],

    },
    properties: {
 	"marker-color": "#005288",
	"marker-size": "medium",
	"marker-symbol": "rocket",
	"title": "<h1>Copenhagen, DK</h1>",
    "description": "Copenhagen is the capital of Denmark. In 2011, Copenhagen Municipality had 548,443 inhabitants, making it Denmark's largest municipality.<br/> <b>Country :</b> Denmark <br/> <b> Surface area:</b> 88.25 km² <br/> <b>Population:</b>602,481 (2017) DST  <br/> <b>Coordinates:</b> 55°40′34″N 12°34′06″E "
	


    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [13.404954, 52.520008]
    },
    properties: {
	"marker-color": "#005288",
	"marker-size": "medium",
	"marker-symbol": "rocket",
	"title": "<h1>Berlin DE</h1>",
    "description": "Berlin is the capital of Germany and as a city-state a federal state of that country. With 3,754,418 inhabitants, Berlin is also the largest city in the country and the largest city in the EU. The city is located in northeastern Germany, on the Spree River.  <br/> <b>Country :</b> Germany <br/> <b>Surface area :</b> 891.8 km² <br/> <b>Population :</b> 3,769 million (Dec 31, 2019)<br/><b>Coordinates :</b> 52°31'NB, 13°23'OL"
	 
    }
  },
    {
    type: 'Feature',
    geometry: {
      type: 'Point',
     coordinates: [4.895168, 52.370216]
    },
    properties: {
	"marker-color": "#005288",
	"marker-size": "medium",
	"marker-symbol": "rocket",
	"title": "<h1>Amsterdam, NL</h1>",
    "description": "Amsterdam, the Dutch capital, is known for its artistic heritage, the extensive canal network and the narrow facade houses, a legacy from the Golden Age. The Museum Quarter houses the Van Gogh Museum, the Rijksmuseum with works by Rembrandt and Vermeer, and the Stedelijk Museum with modern art. Cycling is inextricably linked to the character of the city and there are many cycling paths. <br/> <b>Country :</b> Netherlands <br/> <b>Surface area :</b> 219.49 km²	 <br/><b>Population :</b>  862,965 (Dec 31, 2019)<br/><b>Coordinates :</b> 52° 22′ NB, 4° 54′ OL"  
	 
	 
    }
  },
      {
    type: 'Feature',
    geometry: {
      type: 'Point',
     coordinates: [28.978359, 41.008240]
    },
    properties: {
	"marker-color": "#005288",
	"marker-size": "medium",
	"marker-symbol": "rocket",
	"title": "<h1>Istanbul, TR</h1>",
    "description": "Istanbul or Istanbul is a city in the European and Asian part of Turkey and was the capital of the Ottoman Empire. Before that, she was the capital of the Byzantine Empire under the name Constantinople. The city was originally founded by Greek settlers in 667 BC. and was called Byzantion by them.<br/> <b>Country :</b> Turkey <br/> <b>Surface area :</b>5,343 km²<br/><b>Population :</b> 15.52 million (Dec 31, 2019)<br/><b>Coordinates :</b> 41°00′49″N 28°57′18″E"	  
	 
	 
    }
  },
      {
    type: 'Feature',
    geometry: {
      type: 'Point',
       coordinates: [2.352222, 48.856613]
    },
    properties: {
	"marker-color": "#005288",
	"marker-size": "medium",
	"marker-symbol": "rocket",
	"title": "<h1>Paris, FR</h1>",
    "description": "Paris is the capital and seat of government of France. The city is bisected by the River Seine. Paris itself had approximately 2.22 million inhabitants in 2014, not including the banlieues. In 2014, more than 10 million people lived in the entire agglomeration. Paris is located in the Île-de-France region.<br/> <b>Country :</b> France <br/> <b>Surface area :</b> 105.4 km² <br/><b>Population :</b>  2,148 million (Jan 1, 2020)<br/><b>Coordinates :</b> 48° 52′ NB, 2° 22′ OL"	  
	 
	 
    }
  },
      {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-3.691817, 40.419620]
    },
    properties: {
	"marker-color": "#005288",
	"marker-size": "medium",
	"marker-symbol": "rocket",
	"title": "<h1>Madrid, SP</h1>",
    "description": "Madrid is the capital and largest city in Spain. The city is also a municipality and is located in the center of the country, on the Spanish Plateau. It is the fifth largest city in Europe and a so-called beta world city. Madrid is the capital of the autonomous region of the same name.<br/> <b>Country :</b> Spain<br/> <b>Surface area :</b>  606 km² <br/><b>Population :</b>  6.642 million (Dec 31, 2019)<br/><b>Coordinates :</b> 	40° 25′ NB, 3° 41′ WL²"	  
	 
	 
    }
  },
        {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [27.481871, 53.941021]
    },
    properties: {
	"marker-color": "#005288",
	"marker-size": "medium",
	"marker-symbol": "rocket",
	"title": "<h1>Minsk, BY</h1>",
    "description": "Minsk is the capital of Belarus. The city has over 1.8 million inhabitants and is located in the center of the country. Minsk is bisected from south to north by the river Svislotsj. Minsk is an important traffic junction, where the routes from Berlin to Moscow and from Northern Europe to Ukraine intersect. <br/> <b>Country :</b> Belarus <br/><b>Surface area :</b> 348.8 km² <br/><b>Population :</b> 1,975 million (Dec 31, 2017)<br/><b>Coordinates :</b> 	53° 54′ NB, 27° 33′ OL"	  
	 
    }
  },
        {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [12.493547, 41.889294]
    },
    properties: {
	"marker-color": "#005288",
	"marker-size": "medium",
	"marker-symbol": "rocket",
	"title": "<h1>Rome, IT</h1>",
    "description": " Rome is the capital of Italy and the administrative center of the Lazio region and the Città Metropolitana di Roma Capitale. The city has approximately 2.8 million inhabitants, the population of the metropolitan region is 3.7 million. It is the largest city in Italy. <br/> <b>Country :</b> Italy <br/><b>Surface area :</b> 1285 km² <br/><b>Population :</b>  2,863,322;  (Dec 31, 2013)<br/><b>Coordinates :</b>41°53′N 12°30′E"	  
	 
    }
  }
  
  
  
  
  
];


var myLayer = L.mapbox.featureLayer().addTo(map);
myLayer.setGeoJSON(geojson);



myLayer.setGeoJSON(geojson);
myLayer.on('mouseover', function(e) {
    e.layer.openPopup();
});
myLayer.on('mouseout', function(e) {
    e.layer.closePopup();
});


function myFunction() {
  var x = document.getElementById("alert");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

