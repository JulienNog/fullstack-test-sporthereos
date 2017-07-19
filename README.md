FullStack test Sport Heroes
=========

This repository contains my solution for the FullStack test for Sport Heroes.

There is 2 main parts in this test: a backend test and a frontend test.

Those 2 parts are independent.

## Backend

The solution provided for the backend test contains everything that was asked:
+ 5 functions:
  - trackEntersTheBox(gpsTrack,pointNorthWest,pointSouthEast)
  - trackIsInTheBox(gpsTrack,pointNorthWest,pointSouthEast)
  - getDistanceBetweenPointAndNearestGpsPoint(gpsTrack,gpsPoint)
  - getTimeAtTheNearest(gpsTrack,anotherGpsTrack)
  - getDistanceAtTheNearest(gpsTrack,anotherGpsTrack,ignoreTime)
+ unitary tests
+ jsdoc
+ package.json configured to be published on npm

## Frontend

The solution provided for the frontend test contains the following:
+ the function getRanking(rankingId)
+ unitary tests
+ bower.json configured to be published on bower
