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

describe('little-time', function(){
    var littleTime;
    before(function(done){
        littleTime = require('../little-time.js');
        done();
    });

    it('works as an npm module', function(){
        var localLittleTime = require('../little-time.js');
        assert.equal(typeof localLittleTime, 'function');
    });

    describe('format', function() {
        var defaultTime = 'February 6, 2001 13:03:29.324';
        var defaultTimeObj = new Date(defaultTime)
        var utcDefaultTime = defaultTimeObj.getTime() - defaultTimeObj.getTimezoneOffset() * 60 * 1000;

        it('processes timestamps', function(){
            var result         = littleTime('Jul 8 2014 11:18:55').format('ddd MMM Do YYYY HH:mm:ss');
            var expectedResult = 'Tue Jul 8th 2014 11:18:55';
            assert.equal(result, expectedResult);
        });

        it('processes JS Date-friendly inputs', function(){
            var result         = littleTime('Jul 07 2014 20:10:23').format('ddd MMM Do YYYY hh:mm:ssa');
            var expectedResult = 'Mon Jul 7th 2014 08:10:23pm';
            assert.equal(result, expectedResult);
        });

        describe('month', function() {
            it('M', function() {
                assert.equal(littleTime('February 6, 2001').format('M'), '2');
            });

            it('Mo 1', function() {
                assert.equal(littleTime('January 6, 2001').format('Mo'), '1st');
            });

            it('Mo 2', function() {
                assert.equal(littleTime(defaultTime).format('Mo'), '2nd');
            });

            it('Mo 3', function() {
                assert.equal(littleTime('March 6, 2001').format('Mo'), '3rd');
            });

            it('Mo 4', function() {
                assert.equal(littleTime('December 6, 2001').format('Mo'), '12th');
            });

            it('MM', function() {
                assert.equal(littleTime(defaultTime).format('MM'), '02');
            });

            it('MMM', function() {
                assert.equal(littleTime(defaultTime).format('MMM'), 'Feb');
            });

            it('MMMM', function() {
                assert.equal(littleTime(defaultTime).format('MMMM'), 'February');
            });
        });

        describe('day of month', function() {
            it('D', function() {
                assert.equal(littleTime(defaultTime).format('D'), '6');
            });

            it('Do 1', function() {
                assert.equal(littleTime('March 11, 2001').format('Do'), '11th');
            });

            it('Do 2', function() {
                assert.equal(littleTime('March 21, 2001').format('Do'), '21st');
            });

            it('Do 3', function() {
                assert.equal(littleTime('March 22, 2001').format('Do'), '22nd');
            });

            it('Do 4', function() {
                assert.equal(littleTime('March 23, 2001').format('Do'), '23rd');
            });

            it('DD', function() {
                assert.equal(littleTime(defaultTime).format('DD'), '06');
            });
        });

        describe('day of year', function() {
            it('DDD', function() {
                assert.equal(littleTime(defaultTime).format('DDD'), '37');
            });

            it('DDDo 1', function() {
                assert.equal(littleTime('January 1, 2001').format('DDDo'), '1st');
            });

            it('DDDo 2', function() {
                assert.equal(littleTime('January 2, 2001').format('DDDo'), '2nd');
            });

            it('DDDo 3', function() {
                assert.equal(littleTime('January 3, 2001').format('DDDo'), '3rd');
            });

            it('DDDo 4', function() {
                assert.equal(littleTime('August 5, 2016').format('DDDo'), '218th');
            });

            it('DDDD', function() {
                assert.equal(littleTime(defaultTime).format('DDDD'), '037');
            });
        });

        describe('day of week', function() {
            it('d', function() {
                assert.equal(littleTime(defaultTime).format('d'), '2');
            });

            it('do', function() {
                assert.equal(littleTime(defaultTime).format('do'), '2nd');
            });

            it('dd', function() {
                assert.equal(littleTime(defaultTime).format('dd'), 'Tu');
            });

            it('ddd', function() {
                assert.equal(littleTime(defaultTime).format('ddd'), 'Tue');
            });

            it('dddd', function() {
                assert.equal(littleTime(defaultTime).format('dddd'), 'Tuesday');
            });
        });

        describe('year', function() {
            it('YY', function() {
                assert.equal(littleTime(defaultTime).format('YY'), '01');
            });

            it('YYYY', function() {
                assert.equal(littleTime(defaultTime).format('YYYY'), '2001');
            });

            it('yy', function() {
                assert.equal(littleTime(defaultTime).format('yy'), '01');
            });

            it('yyyy', function() {
                assert.equal(littleTime(defaultTime).format('yyyy'), '2001');
            });
        });

        describe('hours', function() {
            it('H', function() {
                assert.equal(littleTime(defaultTime).format('H'), '13');
            });

            it('HH', function() {
                assert.equal(littleTime('February 6, 2001 08:03:29').format('HH'), '08');
            });

            it('h', function() {
                assert.equal(littleTime(defaultTime).format('h'), '1');
            });

            it('hh', function() {
                assert.equal(littleTime('February 6, 2001 08:03:29').format('hh'), '08');
            });

            it('k', function() {
                assert.equal(littleTime(defaultTime).format('k'), '14');
            });

            it('kk', function() {
                assert.equal(littleTime('February 6, 2001 08:03:29').format('kk'), '09');
            });
        });

        describe('minutes', function() {
            it('m', function() {
                assert.equal(littleTime(defaultTime).format('m'), '3');
            });

            it('mm', function() {
                assert.equal(littleTime(defaultTime).format('mm'), '03');
            });
        });

        describe('second', function() {
            it('s', function() {
                assert.equal(littleTime(defaultTime).format('s'), '29');
            });

            it('ss', function() {
                assert.equal(littleTime('February 6, 2001 08:03:09').format('ss'), '09');
            });
        });

        describe('fractional second', function() {
            it('S', function() {
                assert.equal(littleTime(defaultTime).format('S'), '3');
            });

            it('SS', function() {
                assert.equal(littleTime(defaultTime).format('SS'), '32');
            });

            it('SSS', function() {
                assert.equal(littleTime(defaultTime).format('SSS'), '324');
            });
        });

        describe('unix timestamp', function() {
            it('X', function() {
                assert.equal(littleTime.utc(utcDefaultTime).format('X'), '981464609');
            });

            it('x', function() {
                assert.equal(littleTime.utc(utcDefaultTime).format('x'), '981464609324');
            });
        });
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