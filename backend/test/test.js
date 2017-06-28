var should = require('chai').should(),
    expect = require('chai').expect,
    gpsTracker = require('../index'),
    trackEntersBox = gpsTracker.trackEntersTheBox,
    trackInBox = gpsTracker.trackIsInTheBox,
    distTrackPoint = gpsTracker.getDistanceBetweenPointAndNearestGpsPoint,
    distAtNearest = gpsTracker.getDistanceAtTheNearest,
    timeAtNearest = gpsTracker.getTimeAtTheNearest;

describe('#trackEntersBox', function() {
    it('verify track enters the box', function() {
        var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                        {lat : 25, lon : 28, time : 1484847607025}],
            pointNorthWest = {lat : 30, lon : 22},
            pointSouthEast = {lat : 22, lon : 42};

        trackEntersBox(gpsTrack, pointNorthWest, pointSouthEast).should.equal(true);
    });
    it('verify track does not enter the box', function() {
        var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                        {lat : 21, lon : 28, time : 1484847607025}],
            pointNorthWest = {lat : 30, lon : 22},
            pointSouthEast = {lat : 22, lon : 42};

        trackEntersBox(gpsTrack, pointNorthWest, pointSouthEast).should.equal(false);
    });
    it('verify TypeError thrown when wrong params', function() {
        var badfn = function() {
            var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                            {lat : 42, lon : 22, time : 1484847607025}],
                pointNorthWest = {lat : 32, lon : 22},
                pointSouthEast = "wrong";

            trackEntersBox(gpsTrack, pointNorthWest, pointSouthEast);
        }
        
        expect(badfn).to.throw(TypeError);
    });
});

describe('#trackInBox', function() {
    it('verify track is entirely in the box', function() {
        var gpsTrack = [{lat : 30, lon : 23, time : 1484847603025},
                        {lat : 25, lon : 28, time : 1484847607025}],
            pointNorthWest = {lat : 32, lon : 22},
            pointSouthEast = {lat : 22, lon : 42};

        trackInBox(gpsTrack, pointNorthWest, pointSouthEast).should.equal(true);
    });
    it('verify TypeError thrown when wrong params', function() {
        var badfn = function() {
            var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                            {lat : 42, lon : 22, time : 1484847607025}],
                pointNorthWest = {lat : 32, la : 22},
                pointSouthEast = {lat : 22, lon : 42};

            trackInBox(gpsTrack, pointNorthWest, pointSouthEast);
        }
        
        expect(badfn).to.throw(TypeError);
    });
});

describe('#distTrackPoint', function() {
    it('verify shortest distance is 100km', function() {
        var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                        {lat : 42, lon : 22, time : 1484847607025}],
            gpsPoint = {lat : 32.8994, lon : 22};

        expect(distTrackPoint(gpsTrack, gpsPoint)).to.be.within(99.99, 100.01);
    });
    it('verify TypeError thrown when wrong params', function() {
        var badfn = function() {
            var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                            {lat : 42, lon : 22, time : 1484847607025}],
                gpsPoint = {lat : 32.8994, lon : 22};

            distTrackPoint(gpsPoint, gpsTrack);
        }
        
        expect(badfn).to.throw(TypeError);
    });
});

describe('#distAtNearest', function() {
    it('verify shortest distance is 111km when ignoring time', function() {
        var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                        {lat : 44, lon : 22, time : 1484847609025},
                        {lat : 42, lon : 22, time : 1484847607025}],
            anotherGpsTrack = [{lat : 25, lon : 22, time : 1484847603025},
                        {lat : 31, lon : 22, time : 1484847609025},
                        {lat : 40, lon : 22, time : 1484847607025}];

        expect(distAtNearest(gpsTrack, anotherGpsTrack, true)).to.be.within(111, 112);
    });
    it('verify shortest distance is 222km when same time', function() {
        var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                        {lat : 44, lon : 22, time : 1484847609025},
                        {lat : 42, lon : 22, time : 1484847607025}],
            anotherGpsTrack = [{lat : 25, lon : 22, time : 1484847603025},
                        {lat : 31, lon : 22, time : 1484847609025},
                        {lat : 40, lon : 22, time : 1484847607025}];

        expect(distAtNearest(gpsTrack, anotherGpsTrack, false)).to.be.within(221, 223);
    });
    it('verify TypeError thrown when wrong params', function() {
        var badfn = function() {
            var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                            {lat : 44, lon : 22, time : 1484847609025},
                            {lat : 42, lon : 22}],
                anotherGpsTrack = [{lat : 25, lon : 22, time : 1484847603025},
                            {lat : 31, lon : 22, time : 1484847609025},
                            {lat : 40, lon : 22, time : 1484847607025}];

            distAtNearest(gpsTrack, anotherGpsTrack);
        }
        
        expect(badfn).to.throw(TypeError);
    });
});

describe('#timeAtNearest', function() {
    it('verify shortest distance is at time 1484847607025', function() {
        var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                        {lat : 44, lon : 22, time : 1484847609025},
                        {lat : 42, lon : 22, time : 1484847607025}],
            anotherGpsTrack = [{lat : 25, lon : 22, time : 1484847603025},
                        {lat : 31, lon : 22, time : 1484847609025},
                        {lat : 40, lon : 22, time : 1484847607025}];

        timeAtNearest(gpsTrack, anotherGpsTrack).should.equal(1484847607025);
    });
    it('verify TypeError thrown when wrong params', function() {
        var badfn = function() {
            var gpsTrack = [{lat : 32, lon : 22, time : 1484847603025},
                            {lat : 25, lon : 28, time : 1484847607025}];

            timeAtNearest(gpsTrack);
        }
        
        expect(badfn).to.throw(TypeError);
    });
});

