var geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.14591879999999,39.9496727]
      },
      properties: {
        title: "Menagerie",
        url: "",
        address:"18 S 3rd Street",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.14473009999999,39.9535536]
      },
      properties: {
        title: "Cafe Ole",
        url: "",
        address:"147 N 3rd Street",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.1406512,39.9677286]
      },
      properties: {
        title: "One Shot Cafe",
        url: "",
        address:"217 W George Street",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.1573883,39.941923]
      },
      properties: {
        title: "Chapterhouse Cafe",
        url: "",
        address:"620 S 9th Street",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.1718436,40.034015]
      },
      properties: {
        title: "Uncle Bobbie's",
        url: "",
        address:"5445 Germantown Avenue",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.1563166,39.954249]
      },
      properties: {
        title: "Asia Crafts",
        url: "",
        address:"124 N 10th St",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.1562938,39.9548153]
      },
      properties: {
        title: "Ting Wong",
        url: "",
        address:"138 N 10th St",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.156041,39.953863]
      },
      properties: {
        title: "KC Pastries",
        url: "",
        address:"109 N 10th St",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.155964,39.9559225]
      },
      properties: {
        title: "Mr. Wish",
        url: "",
        address:"216 N 10th St",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.1594066,39.9531914]
      },
      properties: {
        title: "Reading Terminal",
        url: "",
        address:"51 N 12th St",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.16687329999999,39.9502275]
      },
      properties: {
        title: "Hungry Pigeon",
        url: "",
        address:"1526 Sansom St",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    }
  ]
};

var popups = [];

function clearPopups() {
  popups.forEach(function(el) {
    el.remove();
  });
}

mapboxgl.accessToken = 'pk.eyJ1IjoiZHB3ZWJkZXYiLCJhIjoiY2pmYmN2dDB4MWNoYjRlcTdjM2Y3bGpzZyJ9.1m44PhD4VmqEhKhI4FhPKA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dpwebdev/cjfbcjxzi69w52rk936tb9lyu',
  center: [-75.2156881, 39.9483286],
  zoom: 13,
  scrollZoom: false
});

map.addControl(new mapboxgl.NavigationControl());

// populate map
map.on('load', function() {
  map.addSource('data', {
    type: 'geojson',
    data: geojson
  });

  map.addLayer({
    "id": "restaurants",
    "type": "circle",
    "source": "data"
  });
});

// add restaurants to sidebar
for (var i in geojson.features) {
  var prop = geojson.features[i].properties;
  var listing = listings.appendChild(document.createElement('div'));
  listing.className = 'item';
  listing.position = i;

  var title = listing.appendChild(document.createElement('h6'));
  title.className = 'title';
  title.innerHTML = prop.title;

  var details = listing.appendChild(document.createElement('div'));
  details.innerHTML = '<i>'+ prop.address +'</i>';

  // add click event listener for listings
  listing.addEventListener('click', function(e) {
    var feature = geojson.features[this.position];
    var text = '<h4>' + feature.properties.title + '</h4><a href="' +
               feature.properties.url + '" target="_blank">Read more »</a>';
    var coordinates = feature.geometry.coordinates;

    clearPopups();
    map.setCenter(coordinates, 16);
    var popup = new mapboxgl.Popup().setLngLat(coordinates).setHTML(text).addTo(map);
    popups.push(popup);
  });
}

map.on('click', 'restaurants', function (e) {
  var coordinates = e.features[0].geometry.coordinates.slice();
  var prop = e.features[0].properties;
  var text = '<h4>' + prop.title + '</h4><a href="' + prop.url + '" target="_blank">Read more »</a>';

  var popup = new mapboxgl.Popup().setLngLat(coordinates).setHTML(text).addTo(map);
  popups.push(popup);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'restaurants', function () {
  map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'restaurants', function () {
  map.getCanvas().style.cursor = '';
});
