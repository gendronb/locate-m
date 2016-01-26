var point = require('turf-point');

/*
 * @module locate_m
 * @category measurement
 * @param {Feature<LineString>} line input line
 * @param {Number} measure
 * @param {String} name of a "dimension" in properties/coordinateProperties
 * @return {Feature<Point>} Point at `measure` along the line
 * @example
 *  var line = {
 *      "type": "Feature",
 *      "geometry": {
 *          "type": "LineString",
 *          "coordinates": [
 *              [0, 0],
 *              [30, 0],
 *              [60, 30]
 *          ]
 *      },
 *      "properties": {
 *          "coordinateProperties": {
 *              "measures": [
 *                  0,
 *                  10,
 *                  20
 *              ]
 *          }
 *      }
 *  };
 *
 *  var result = locate_m(line, 15, 'measures');
 */

module.exports = function (line, measure, dimension_name) {

    var coords;
    var dimensions;

    if (line.type === 'Feature') coords = line.geometry.coordinates;
    else throw new Error('input must be a LineString Feature');

    // Check if requested dimension is present...
    if (line.properties && line.properties.coordinateProperties && line.properties.coordinateProperties[dimension_name]) {
        dimensions = line.properties.coordinateProperties[dimension_name];
    } else {
        throw new Error('line is missing requested dimension ("' + dimension_name + '")');
    }

    var getDimensionValueAtIndex = function(i) {

        var val = dimensions[i];

        if (typeof val!== 'number') throw new Error('dimension value "' + val + '" at vertex index ' + (i) + ' is not a number');

        return val;

    }

    // Exit early if requested distance is greater than measure at end of line...
    if (measure > getDimensionValueAtIndex(coords.length - 1)) {

        //console.info('requested distance is greater than measure at end of line, returning null...');
        return null;

    }

    var current_measure, previous_measure;

    for (var i = 0; i < coords.length; i++) {

        previous_measure = current_measure;
        current_measure = getDimensionValueAtIndex(i);

        // Check if measures at increasing...
        if (current_measure < previous_measure) throw new Error('Dimension value at vertex index ' + i + ' is not increasing...');

        if (measure < current_measure) {

            if (i === 0) {

                // Exit and return null if requested distance is smaller than measure at start of line...
                // console.info('requested distance is smaller than measure at start of line, returning null...');
                return null;

            } else {

                // Calculate position of point...
                var ratio = (measure - previous_measure) / ((current_measure - previous_measure) || current_measure);
                //console.log('Found, calculate position for ratio, m1, m2 = ', ratio, previous_measure, current_measure);
                var pt1 = coords[i - 1];
                var pt2 = coords[i];
                //console.log(pt1, pt2);
                return point([((pt2[0] - pt1[0]) * ratio) + pt1[0], ((pt2[1] - pt1[1]) * ratio) + pt1[1]]);

            }

        } else if (measure === current_measure) {

            // Return current point if its measure is equal to the requested distance
            return point(coords[i]);

        }

    }

}
