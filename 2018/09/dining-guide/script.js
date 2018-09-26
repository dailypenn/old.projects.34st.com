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

const popups = [];

mapboxgl.accessToken = 'pk.eyJ1IjoiZHB3ZWJkZXYiLCJhIjoiY2pmYmN2dDB4MWNoYjRlcTdjM2Y3bGpzZyJ9.1m44PhD4VmqEhKhI4FhPKA';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dpwebdev/cjfbcjxzi69w52rk936tb9lyu',
  center: [-75.1604066,39.9431914],
  zoom: 13,
  scrollZoom: false
});

map.addControl(new mapboxgl.NavigationControl());

// populate map
map.on('load', () => {
  map.addSource('data', {
    type: 'geojson',
    data: geojson
  });

  map.addLayer({
    id: 'restaurants',
    type: 'circle',
    paint: {
      "circle-color": 'rgb(232,75,59)'
    },
    source: 'data'
  });

  // add listeners for popups when clicking on point
  map.on('click', 'restaurants', e => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const prop = e.features[0].properties;
    const text = `<h4>${prop.title}</h4><p class="address">${prop.address}</p><a href="${prop.url}" target="_blank">Read more »</a>`;

    popups.push(new mapboxgl.Popup().setLngLat(coordinates).setHTML(text).addTo(map));
  });

  // change the cursor to a pointer when the mouse is over the current layer
  map.on('mouseenter', name, () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  // change it back to a pointer when it leaves.
  map.on('mouseleave', name, () => {
    map.getCanvas().style.cursor = '';
  });
});

// add restaurants to sidebar
for (let i in geojson.features) {
  const prop = geojson.features[i].properties;

  const listing = listings.appendChild(document.createElement('div'));
  listing.className = 'item';
  listing.position = i;

  const title = listing.appendChild(document.createElement('h6'));
  title.className = 'title';
  title.innerHTML = prop.title;

  const details = listing.appendChild(document.createElement('div'));
  details.innerHTML = `<p class="address">${prop.address}</p>`;

  // add click event listener for listings
  listing.addEventListener('click', function(e) {
    const curr = geojson.features[this.position];
    const prop = curr.properties;
    const text = `<h4>${prop.title}</h4><p class="address">${prop.address}</p><a href="${prop.url}" target="_blank">Read more »</a>`;
    const coordinates = curr.geometry.coordinates;

    // clear popups so we only have one on the map at once
    popups.forEach(el => {
      el.remove();
    });

    map.setCenter(coordinates, 16);
    popups.push(new mapboxgl.Popup().setLngLat(coordinates).setHTML(text).addTo(map));
  });
}
