gps-tracking
=========

A library allwoing to manipulate GPS tracks and coordinates to determine distances between them andlocation of GPS tracks.

## Installation

  npm install gps-tracking

## Usage

```js
  var gpsTracker = require('gps-tracking'),
      trackEntersBox = gpsTracker.trackEntersTheBox,
      trackInBox = gpsTracker.trackIsInTheBox,
      distTrackPoint = gpsTracker.getDistanceBetweenPointAndNearestGpsPoint,
      distAtNearest = gpsTracker.getDistanceAtTheNearest,
      timeAtNearest = gpsTracker.getTimeAtTheNearest;

  var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                  {lat : 25, lon : 28, time : 1484847607025}],
      anotherGpsTrack = [{lat : 25, lon : 22, time : 1484847603025},
                  {lat : 31, lon : 22, time : 1484847609025},
                  {lat : 40, lon : 22, time : 1484847607025}],
      pointNorthWest = {lat : 30, lon : 22},
      pointSouthEast = {lat : 22, lon : 42},
      ignoreTime = false;

  var isEntering = trackEntersBox(gpsTrack, pointNorthWest, pointSouthEast);
  var isInside = trackInBox(gpsTrack, pointNorthWest, pointSouthEast);
  var distance = distTrackPoint(gpsTrack, gpsPoint);
  var distance = distAtNearest(gpsTrack, anotherGpsTrack, ignoreTime);
  var timestamp = timeAtNearest(gpsTrack, anotherGpsTrack);
```

## Tests

  npm test

## Contributing

Take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.

## Release History

* 0.0.1 Initial release