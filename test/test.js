var expect = require('chai').expect,
  reproject = require('../'),
  GeoEq = require('geojson-equality'),
  set = require('./test-data.js');

describe('reproject spherical mercator', function() {
  var eq = new GeoEq({precision: 5});
  it('Point', function() {
    expect(
      eq.compare(
        reproject(set['Point'].input),
        set['Point'].output
      )
    ).to.be.true;
  });
  it('LineString', function() {
    expect(
      eq.compare(
        reproject(set['LineString'].input),
        set['LineString'].output
      )
    ).to.be.true;
  });
  it('Polygon', function() {
    expect(
      eq.compare(
        reproject(set['Polygon'].input),
        set['Polygon'].output
      )
    ).to.be.true;
  });
  it('Polygon with hole', function() {
    expect(
      eq.compare(
        reproject(set['Polygon with hole'].input),
        set['Polygon with hole'].output
      )
    ).to.be.true;
  });
  it('MultiPoint', function() {
    expect(
      eq.compare(
        reproject(set['MultiPoint'].input),
        set['MultiPoint'].output
      )
    ).to.be.true;
  });
  it('MultiLineString', function() {
    expect(
      eq.compare(
        reproject(set['MultiLineString'].input),
        set['MultiLineString'].output
      )
    ).to.be.true;
  });
  it('MultiPolygon', function() {
    expect(
      eq.compare(
        reproject(set['MultiPolygon'].input),
        set['MultiPolygon'].output
      )
    ).to.be.true;
  });
  it('MultiPolygon with hole', function() {
    expect(
      eq.compare(
        reproject(set['MultiPolygon with hole'].input),
        set['MultiPolygon with hole'].output
      )
    ).to.be.true;
  });
  it('Feature', function() {
    expect(
      eq.compare(
        reproject(set['Feature'].input),
        set['Feature'].output
      )
    ).to.be.true;
  });
  it('Not a valid geojson', function() {
    expect(
      reproject.bind(this,{type:"Geometry", coordinates: [10,20]})
    ).to.throw(Error);
  });
});
