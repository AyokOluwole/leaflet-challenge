
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});


// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var url;

d3.json(url).then(function (data) {
    function mapStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: mapColor(feature.geometry.coordinates[2]),
            color: "black",
            radius: mapRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };


    }


    // 90+ red
    // 70 - 90 = orangered
    //50-70 = orange 
    //30-50 =  orangeyellow
    // 10-30 = lime
    //-10-10 = green
    //

    function mapColor(depth) {
        switch (true) {
            case depth > 90:
                return "red";
            case depth > 70:
                return "orangered";
            case depth > 50:
                return "orange";
            case depth > 30:
                return "gold";
            case depth > 10:
                return "yellow";
            default:
                return "lightgreen";
        }
    }
    function mapRadius(mag) {
        if (mag === 0) {
            return 1;
        }

        return mag * 4;
    }

    L.geoJson(data, {

        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },

        style: mapStyle,

        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2]);

        }
    }).addTo(myMap);

//LEGEND
var legend = L.control({ position: "bottomright" });
        
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var colors = ["lightgreen", "yellow", "gold", "orange", "orangered", "red"];
    var title = "Earthquake Depth Visualization "
    var depths = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"]

    var legendItems = colors.map((color, index) => {
        return `<div class="row row-cols-2 mx-sm-2" style="width: 128px;"><div style="height: 12px; width: 12px; background: ${color}"></div>` + `<span>${depths[index]}</span></div>`;
      });
      var legendHTML = `<div class="container bg-white py-sm-2"> <h5 class="ms-sm-1">${title}</h5> ${legendItems.join('')}</div>`

    div.innerHTML = legendHTML;

    return div;
  };
legend.addTo(myMap)



});


//example in class
// // Set up the legend.
// var legend = L.control({ position: "bottomright" });
// legend.onAdd = function() {
//   var div = L.DomUtil.create("div", "info legend");
//   var limits = geojson.options.limits;
//   var colors = geojson.options.colors;
//   var labels = [];

//   // Add the minimum and maximum.
//   var legendInfo = "<h1>Eae<br />(ages 6-17)</h1>" +
//     "<div class=\"labels\">" +
//       "<div class=\"min\">" + limits[0] + "</div>" +
//       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//     "</div>";

//   div.innerHTML = legendInfo;

//   limits.forEach(function(limit, index) {
//     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//   });

//   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//   return div;
// };

// // Adding the legend to the map
// legend.addTo(myMap);

