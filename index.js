// reproject-spherical-mercator index.js
var SphericalMercator = require('sphericalmercator'),
  sm = new SphericalMercator({size: 256});
function projCoords(coords) {
  return coords.map(function(coord) {
    return sm.forward(coord);
  });
}

var reproject = function(g) {
  var gre = {type: g.type};
  if (g.type == 'Point') {
    gre.coordinates = sm.forward(g.coordinates);
  } else if (g.type == 'LineString' || g.type == 'MultiPoint') {
    gre.coordinates = projCoords(g.coordinates);
  } else if (g.type == 'Polygon' || g.type == 'MultiLineString') {
    gre.coordinates = g.coordinates.map(function(part) {
      return projCoords(part);
    });
  } else if (g.type =='MultiPolygon') {
    gre.coordinates = g.coordinates.map(function(poly) {
      return poly.map(function(part) {
        return projCoords(part);
      });
    });
  } else if (g.type == 'Feature') {
    gre.geometry = reproject(g.geometry);
    if (g.id) gre.id = g.id;
    if (g.properties) gre.properties = g.properties;
  } else {
    throw 'Not valid geojson';  
  }
  return gre; 
};

module.exports = reproject;
