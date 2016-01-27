# locate-m

### `locate-m(Line, Measure, Dimension_Name)`

Locates a feature along a line by using measures (eg. timestamp) stored as additional properties ("dimensions") of that line. These dimensions must follow Mapbox's `geojson-coordinateProperties` proposal (https://github.com/mapbox/geojson-coordinate-properties).
Similar to `LocateFeaturesAlongRoutes` in ArcGIS, but one measure at a time.

### Use Cases

- Locating pictures along a GPX track (X, Y, Z, timestamp) using a "Date and Time" EXIF field.
- Locating incidents along a pipeline or road by using an arbitrary measure system.


### Parameters

| parameter        | type       | description                                               |
| ---------------- | ---------- | --------------------------------------------------------- |
| `Line`           | LineString |                                                           |
| `Measure`        | Number     | the measure at which to place the resulting feature       |
| `Dimension_Name` | String     | name of a property ("dimension") in `properties/coordinateProperties`  |                                                      |


### Example

```js
  var locate_m = require('./');

  var line = {
      "type": "Feature",
      "geometry": {
          "type": "LineString",
          "coordinates": [
              [0, 0],
              [30, 0],
              [60, 30]
          ]
      },
      "properties": {
          "coordinateProperties": {
              // this is one dimension...
              "measures": [
                  0,
                  10,
                  20
              ]
          }
      }
  };

  var result = locate_m(line, 15, 'measures');

  // { type: 'Feature',
  //        geometry: { type: 'Point', coordinates: [ 45, 15 ] },
  //        properties: {}
  // }

```
**Returns** `Feature.<Point>`. Returns `null` if measure is smaller or larger than measures at start or end of line. Throws an `Exception` if dimension is not present in `coordinateProperties`, or if measures are not increasing.

## Tests

```sh
$ npm test
```
