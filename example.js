var locate_m = require('./');

var line = {
    "type": "Feature",
    "geometry": {
        "type": "LineString",
        "coordinates": [
            [0, 0],
            [30, 0],
            [60, 30],
            [60, 60]
        ]
    },
    "properties": {
        "coordinateProperties": {
            "measures": [
                0,
                10,
                15,
                20
            ]
        }
    }
 };

 var result = locate_m(line, 15, 'measures');

 console.log('Result = ', result);
