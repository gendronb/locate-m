var test = require('tape');
var fs = require('fs');
var locate_m = require('./');
//var point = require('turf-point');

var line = JSON.parse(fs.readFileSync(__dirname + '/fixtures/line.geojson'));
var line_non_incrementing_measures = JSON.parse(fs.readFileSync(__dirname + '/fixtures/line-non-incrementing-measures.geojson'));
var line_negative_measures = JSON.parse(fs.readFileSync(__dirname + '/fixtures/line-negative-measures.geojson'));

test('locate_m', function (t) {

	var result;

	t.throws(function() {locate_m(line, -10, 'times')}, 'Throws if dimension is not present');

	t.throws(function() {locate_m(line_non_incrementing_measures, 15, 'measures')}, 'Throws if measures are not incrementing');

	result = locate_m(line, -10, 'measures');
	t.notOk(result, 'Returns null if measure is smaller than measure at stard of line');

	result = locate_m(line, 100, 'measures');
	t.notOk(result, 'Returns null if measure is larger than measure at end of line');

	var measuresToTest = [
		{measure: 0, expecting: [0, 0]},
		{measure: 5, expecting: [15, 0]},
		{measure: 10, expecting: [30, 0]},
		{measure: 20, expecting: [60, 60]}
	];

    measuresToTest.forEach(function (f) {

		result = locate_m(line, f.measure, 'measures');

		t.ok(result, 'Returns a value');
		t.equal(result.type, 'Feature', 'Returned value is a Feature');
		t.equal(result.geometry.type, 'Point', 'Returned geometry type is a Point');
		t.deepEqual(result.geometry.coordinates, f.expecting, 'Returns correct point coordinates');

    });

	result = locate_m(line_negative_measures, -20, 'measures');
	t.deepEqual(result.geometry.coordinates, [15, 0], 'Works with negative measures');

	t.end();

});
