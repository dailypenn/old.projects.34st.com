var cat1 = {
  type: "FeatureCollection",
  catName:"Category 1",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.225566,40.026258]
      },
      properties: {
        title: "Lucky's Last Chance Cat 1",
        url: "http://www.34st.com/article/2018/03/luckys-last-chance-dining-guide-food-drink-review-style",
        address:"4421 Main St, Philadelphia, PA 19127",
        blurb: "Blurb for Lucky's Last Chance",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.1647147,39.9484661]
      },
      properties: {
        title: "Maison 208 Cat1",
        url: "http://www.34st.com/article/2018/03/maison-208-restauraunt-view-dining-guide-food-drink-style-culture",
        address:"208 S 13th St, Philadelphia, PA 19107",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    }
  ]
};

var cat2 = {
  type: "FeatureCollection",
  catName:"Category 2",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.225566,40.026258]
      },
      properties: {
        title: "Lucky's Last Chance Cat2",
        url: "http://www.34st.com/article/2018/03/luckys-last-chance-dining-guide-food-drink-review-style",
        address:"4421 Main St, Philadelphia, PA 19127",
        blurb: "Blurb for Lucky's Last Chance",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.1647147,39.9484661]
      },
      properties: {
        title: "Maison 208 Cat2",
        url: "http://www.34st.com/article/2018/03/maison-208-restauraunt-view-dining-guide-food-drink-style-culture",
        address:"208 S 13th St, Philadelphia, PA 19107",
        "marker-color": "#326522",
        "marker-size": "large"
      }
    }
  ]
};

var dataArray = [cat1, cat2];

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
  scrollZoom: true
});

map.addControl(new mapboxgl.NavigationControl());

// populate map
map.on('load', function() {
  map.addSource('data', {
    type: 'geojson',
    data: cat1
  });

  map.addSource('cat2', {
    type: 'geojson',
    data: cat2
  });

  map.addLayer({
    "id": "cat1",
    "type": "circle",
    "paint": {
      "circle-color": "#000000"
    },
    "source": "data"
  });

  map.addLayer({
    "id": "cat2",
    "type": "circle",
    "paint": {
      "circle-color": "#FFF000"
    },
    "source": "data"
  });
});

for (let data of dataArray){
  const listing = listings.appendChild(document.createElement('div'));
  listing.className = 'item';

  for (let feature of data.features) {
    const prop = feature.properties;

    const title = listing.appendChild(document.createElement('h6'));
    title.className = 'title';
    title.innerHTML = prop.title;

    const details = listing.appendChild(document.createElement('div'));
    details.innerHTML = '<i>'+ prop.address +'</i>';

    listing.addEventListener('click', function(e) {
      const text = `<h4>${features.properties.title}</h4><p class="blurb">${features.properties.blurb}</p><a href="${prop.url}" target="_blank">Read more »</a>`;
      const coordinates = prop.geometry.coordinates;

      clearPopups();
      map.setCenter(coordinates, 16);
      var popup = new mapboxgl.Popup().setLngLat(coordinates).setHTML(text).addTo(map);
      popups.push(popup);
    });
  }
}

// for (var i in geojson.features) {
//   var prop = geojson.features[i].properties;
//   var listing = listings.appendChild(document.createElement('div'));
//   listing.className = 'item';
//   listing.position = i;
//
//   var title = listing.appendChild(document.createElement('h6'));
//   title.className = 'title';
//   title.innerHTML = prop.title;
//
//   var details = listing.appendChild(document.createElement('div'));
//   details.innerHTML = '<i>'+ prop.address +'</i>';
//
//   // add click event listener for listings
//   listing.addEventListener('click', function(e) {
//     var feature = geojson.features[this.position];
//     var text = '<h4>' + feature.properties.title + '</h4><p class="blurb">' + feature.properties.blurb  + '</p><a href="' +
//                feature.properties.url + '" target="_blank">Read more »</a>';
//     var coordinates = feature.geometry.coordinates;
//
//     clearPopups();
//     map.setCenter(coordinates, 16);
//     var popup = new mapboxgl.Popup().setLngLat(coordinates).setHTML(text).addTo(map);
//     popups.push(popup);
//   });
// }

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
