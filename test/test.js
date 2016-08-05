(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['mocha', 'assert'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('mocha'), require('assert'));
    } else {
        // Browser globals (root is window)
        root.littleTimeTests = factory(root.mocha, root.assert);
    }
}(this, function(mocha, assert) {

var context = this;

describe('little-time ', function(){
    var littleTime;
    before(function(done){
        littleTime = require('../little-time.js');
        done();
    });

    it('works as an npm module', function(){
        var localLittleTime = require('../little-time.js');
        assert.equal(typeof localLittleTime, 'function');
        return;
    });

    it('processes timestamps', function(){
        var result         = littleTime(1404843535580, 'ddd mmm ddS yyyy HH:MM:ss');
        var expectedResult = 'Tue Jul 08th 2014 11:18:55';
        assert.equal(result, expectedResult);
        return;
    });

    it('processes JS Date-friendly inputs', function(){
        var result         = littleTime('Jul 07 2014 20:10:23', 'ddd mmm ddS yyyy hh:MM:sstt');
        var expectedResult = 'Mon Jul 07th 2014 08:10:23pm';
        assert.equal(result, expectedResult);
        return;
    });

    describe('fromNow', function(){
        var baseTime = 1470361760000;

        var times = {
            minute: 60000,
            twoMinutes: 120000,
            hour: 3600000,
            twoHours: 7200000,
            day: 86400000,
            twoDays: 172800000,
            month: 2678400000,
            twoMonths: 5356800000,
            year: 31536000000,
            twoYears: 63072000000
        };

        var origDateNow;
        before(function() {
            origDateNow = Date.now;

            // Always return a predictable timestamp for tests.
            context.Date.now = function() {
                return 1470361760000;
            }
        });

        it('returns "a few seconds ago"', function() {
            assert.equal(littleTime(baseTime).fromNow(), 'a few seconds ago');
        });

        it('returns "a minute ago"', function() {
            assert.equal(littleTime(baseTime - times.minute).fromNow(), 'a minute ago');
        });

        it('returns "2 minutes ago"', function() {
            assert.equal(littleTime(baseTime - times.twoMinutes).fromNow(), '2 minutes ago');
        });

        it('returns "an hour ago"', function() {
            assert.equal(littleTime(baseTime - times.hour).fromNow(), 'an hour ago');
        });

        it('returns "2 hours ago"', function() {
            assert.equal(littleTime(baseTime - times.twoHours).fromNow(), '2 hours ago');
        });

        it('returns "a day ago"', function() {
            assert.equal(littleTime(baseTime - times.day).fromNow(), 'a day ago');
        });

        it('returns "2 days ago"', function() {
            assert.equal(littleTime(baseTime - times.twoDays).fromNow(), '2 days ago');
        });

        it('returns "a month ago"', function() {
            assert.equal(littleTime(baseTime - times.month).fromNow(), 'a month ago');
        });

        it('returns "2 months ago"', function() {
            assert.equal(littleTime(baseTime - times.twoMonths).fromNow(), '2 months ago');
        });

        it('returns "a year ago"', function() {
            assert.equal(littleTime(baseTime - times.year).fromNow(), 'a year ago');
        });

        it('returns "2 years ago"', function() {
            assert.equal(littleTime(baseTime - times.twoYears).fromNow(), '2 years ago');
        });


        after(function() {
            // Restore original Date.now
            context.Date.now = origDateNow;
        });
    });

});

}));