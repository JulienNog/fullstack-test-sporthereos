var should = require('chai').should(),
    expect = require('chai').expect,
    gpsTracker = require('../index'),
    trackEntersBox = gpsTracker.trackEntersTheBox,
    trackInBox = gpsTracker.trackIsInTheBox,
    distTrackPoint = gpsTracker.getDistanceBetweenPointAndNearestGpsPoint;

describe('#trackEntersBox', function() {
    it('verify track enters the box', function() {
        var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                        {lat : 25, lon : 28, time : 1484847607025}],
            pointNorthWest = {lat : 30, lon : 22},
            pointSouthEast = {lat : 22, lon : 42};

        trackEntersBox(gpsTrack, pointNorthWest, pointSouthEast).should.equal(1);
    });
});

describe('#trackInBox', function() {
    it('verify track is entirely in the box', function() {
        var gpsTrack = [{lat : 30, lon : 23, time : 1484847603025},
                        {lat : 25, lon : 28, time : 1484847607025}],
            pointNorthWest = {lat : 32, lon : 22},
            pointSouthEast = {lat : 22, lon : 42};

        trackInBox(gpsTrack, pointNorthWest, pointSouthEast).should.equal(1);
    });
});

describe('#distTrackPoint', function() {
    it('verify shortest distance is 100km', function() {
        var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                        {lat : 42, lon : 22, time : 1484847607025}],
            gpsPoint = {lat : 32.8994, lon : 22};

        //distTrackPoint(gpsTrack, gpsPoint).should.equal(100);
        expect(distTrackPoint(gpsTrack, gpsPoint)).to.be.within(99.99, 100.01);
    });
});