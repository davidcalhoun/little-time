describe('fromNow', function(){
    var littleTime, mocha, assert;
    before(function(){
        littleTime = require('../little-time');
        mocha = require('mocha');
        assert = require('assert');
    });

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

    describe('past times', function() {
        var baseTime;
        var origDateNow;
        before(function() {
            origDateNow = Date.now;

            // Always return a predictable timestamp for tests.
            Date.now = function() {
                return 1470361760000;
            }

            baseTime = 1470361760000;
        });

        it('a few seconds', function() {
            assert.equal(littleTime(baseTime - 5000).fromNow(), 'a few seconds ago');
        });

        it('a minute', function() {
            assert.equal(littleTime(baseTime - times.minute).fromNow(), 'a minute ago');
        });

        it('2 minutes', function() {
            assert.equal(littleTime(baseTime - times.twoMinutes).fromNow(), '2 minutes ago');
        });

        it('an hour', function() {
            assert.equal(littleTime(baseTime - times.hour).fromNow(), 'an hour ago');
        });

        it('2 hours', function() {
            assert.equal(littleTime(baseTime - times.twoHours).fromNow(), '2 hours ago');
        });

        it('a day', function() {
            assert.equal(littleTime(baseTime - times.day).fromNow(), 'a day ago');
        });

        it('2 days', function() {
            assert.equal(littleTime(baseTime - times.twoDays).fromNow(), '2 days ago');
        });

        it('a month', function() {
            assert.equal(littleTime(baseTime - times.month).fromNow(), 'a month ago');
        });

        it('2 months', function() {
            assert.equal(littleTime(baseTime - times.twoMonths).fromNow(), '2 months ago');
        });

        it('a year', function() {
            assert.equal(littleTime(baseTime - times.year).fromNow(), 'a year ago');
        });

        it('2 years', function() {
            assert.equal(littleTime(baseTime - times.twoYears).fromNow(), '2 years ago');
        });


        after(function() {
            // Restore original Date.now
            Date.now = origDateNow;
        });
    });

    describe('future times', function() {
        var baseTime;
        var origDateNow;
        before(function() {
            origDateNow = Date.now;

            // Always return a predictable timestamp for tests.
            Date.now = function() {
                return 1470361760000;
            }

            baseTime = 1470361760000;
        });

        it('a few seconds', function() {
            assert.equal(littleTime(baseTime + 5000).fromNow(), 'in a few seconds');
        });

        it('a minute', function() {
            assert.equal(littleTime(baseTime + times.minute).fromNow(), 'in a minute');
        });

        it('2 minutes', function() {
            assert.equal(littleTime(baseTime + times.twoMinutes).fromNow(), 'in 2 minutes');
        });

        it('an hour', function() {
            assert.equal(littleTime(baseTime + times.hour).fromNow(), 'in an hour');
        });

        it('2 hours', function() {
            assert.equal(littleTime(baseTime + times.twoHours).fromNow(), 'in 2 hours');
        });

        it('a day', function() {
            assert.equal(littleTime(baseTime + times.day).fromNow(), 'in a day');
        });

        it('2 days', function() {
            assert.equal(littleTime(baseTime + times.twoDays).fromNow(), 'in 2 days');
        });

        it('a month', function() {
            assert.equal(littleTime(baseTime + times.month).fromNow(), 'in a month');
        });

        it('2 months', function() {
            assert.equal(littleTime(baseTime + times.twoMonths).fromNow(), 'in 2 months');
        });

        it('a year', function() {
            assert.equal(littleTime(baseTime + times.year).fromNow(), 'in a year');
        });

        it('2 years', function() {
            assert.equal(littleTime(baseTime + times.twoYears).fromNow(), 'in 2 years');
        });


        after(function() {
            // Restore original Date.now
            Date.now = origDateNow;
        });
    });

});