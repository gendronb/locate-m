# locate_m

### `locate_m(Line, Measure, Dimension_Name)`

Locates a feature along a line by using measures stored as properties ("dimensions") according to Mapbox `geojson-coordinateProperties` proposal (https://github.com/mapbox/geojson-coordinate-properties).
Similar to `LocateFeaturesAlongRoutes` in ArcGIS, but one feature at a time.

### Use Cases

- Locating pictures along a GPX track (X, Y, Z, timestamp) using the "Date and Time" EXIF field.
- Locating incidents along a pipeline or road by using an arbitrary measure system.


### Parameters

| parameter        | type       | description                                               |
| ---------------- | ---------- | --------------------------------------------------------- |
| `Line`           | LineString |                                                           |
| `Measure`        | Number     |                                                           |
| `Dimension_Name` | String     | name of a property ("dimension") in `properties/coordinateProperties`  |                                                      |


### Example

```js
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
              "measures": [
                  0,
                  10,
                  20
              ]
          }
      }
  };

  var result = locate_m(line, 15, 'measures');
```
## Tests

```sh
$ npm test
```