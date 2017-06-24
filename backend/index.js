'use strict';

var earthRadiusKm = 6371;

function pointIsInTheBox(gpsPoint, pointNorthWest, pointSouthEast) {
    if (gpsPoint.lat <= pointNorthWest.lat && gpsPoint.lat >= pointSouthEast.lat && gpsPoint.lon >= pointNorthWest.lon && gpsPoint.lon <= pointSouthEast.lon) {
        //the GPS point is in the box
        return true;
    }
    return false;
}

exports.trackEntersTheBox = function (gpsTrack, pointNorthWest, pointSouthEast) {
    /*check inputs*/
    if (!gpsTrack || !pointNorthWest || !pointSouthEast) {
        //error
        return -1;
    }

    //return value corresponding if the track enters the box or not
    for (var i = 0; i < gpsTrack.length; i++) {
        if (pointIsInTheBox(gpsTrack[i], pointNorthWest, pointSouthEast) === true) {
            //track enters the box
            return 1;
        }
    }
    //the track never enters the box
    return 0;
}

exports.trackIsInTheBox = function (gpsTrack, pointNorthWest, pointSouthEast) {
    /*check inputs*/
    if (!gpsTrack || !pointNorthWest || !pointSouthEast) {
        //error
        return -1;
    } else if (gpsTrack.length === 0) {
        return 0;
    }

    //return value corresponding if the track is entirely in the box or not
    for (var i = 0; i < gpsTrack.length; i++) {
        if (pointIsInTheBox(gpsTrack[i], pointNorthWest, pointSouthEast) === false) {
            //at least 1 GPS point of the track is not in the box
            return 0;
        }
    }
    //the track is entirely in the box
    return 1;
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function getDistanceBetweenTwoGpsPoints(gpsPoint1, gpsPoint2) {
    /*Use of the Haversine Formula*/

    //calculating longitude and latitude absolute differences
    var dLat = degreesToRadians(gpsPoint2.lat-gpsPoint1.lat);
    var dLon = degreesToRadians(gpsPoint2.lon-gpsPoint1.lon);

    //converting the 2 latitudes to radians
    var lat1 = degreesToRadians(gpsPoint1.lat);
    var lat2 = degreesToRadians(gpsPoint2.lat);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);

    //obtaining the great circle distance in radians
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    //return the distance in km by multiplying c by the earth radius in km
    return earthRadiusKm * c;
}

exports.getDistanceBetweenPointAndNearestGpsPoint = function (gpsTrack, gpsPoint) {
    /*check inputs*/
    if (!gpsTrack || !gpsPoint) {
        //error
        return -1;
    }

    var d = -1;
    var dtmp = -1;

    //get distance between each point of the track and the given GPS point
    for (var i = 0; i < gpsTrack.length; i++) {
        dtmp = getDistanceBetweenTwoGpsPoints(gpsTrack[i], gpsPoint);
        //when first time or last distance calculated is less than before
        if (d === -1 || d > dtmp) {
            d = dtmp;
        }
    }

    return d;
}