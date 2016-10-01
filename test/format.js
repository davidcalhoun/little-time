describe('format', function(){
    var littleTime, mocha, assert;
    before(function(){
        littleTime = require('../little-time');
        mocha = require('mocha');
        assert = require('assert');
    });

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

    describe('quarter', function() {
        it('Q', function() {
            assert.equal(littleTime('February 6, 2001').format('Q'), '1');
        });

        it('Q', function() {
            assert.equal(littleTime('April 6, 2001').format('Q'), '2');
        });

        it('Q', function() {
            assert.equal(littleTime('July 6, 2001').format('Q'), '3');
        });

        it('Q', function() {
            assert.equal(littleTime('December 6, 2001').format('Q'), '4');
        });

        it('Q', function() {
            assert.equal(littleTime('February 6, 2001').format('Qo'), '1st');
        });

        it('Q', function() {
            assert.equal(littleTime('April 6, 2001').format('Qo'), '2nd');
        });

        it('Q', function() {
            assert.equal(littleTime('July 6, 2001').format('Qo'), '3rd');
        });

        it('Q', function() {
            assert.equal(littleTime('December 6, 2001').format('Qo'), '4th');
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

    describe('week of year', function() {
        it('w 1', function() {
            assert.equal(littleTime('January 1, 2016').format('w'), '1');
        });

        it('w 2', function() {
            assert.equal(littleTime('December 31, 2015').format('w'), '1');
        });

        it('w 3', function() {
            assert.equal(littleTime('December 31, 2011').format('w'), '53');
        });

        it('w 4', function() {
            assert.equal(littleTime('January 1, 2015').format('w'), '1');
        });

        it('w 5', function() {
            assert.equal(littleTime('January 2, 2016').format('w'), '1');
        });

        it('w 6', function() {
            assert.equal(littleTime('January 3, 2016').format('w'), '2');
        });

        it('w 7', function() {
            assert.equal(littleTime('January 4, 2016').format('w'), '2');
        });

        it('w 8', function() {
            assert.equal(littleTime('January 10, 2016').format('w'), '3');
        });

        it('w 9', function() {
            assert.equal(littleTime('January 9, 2016').format('w'), '2');
        });

        it('w 10', function() {
            assert.equal(littleTime('January 1, 2005').format('w'), '1');
        });

        it('w 11', function() {
            assert.equal(littleTime('December 26, 2004').format('w'), '1');
        });

        it('w 12', function() {
            assert.equal(littleTime('January 1, 2012').format('w'), '1');
        });

        it('w 13', function() {
            assert.equal(littleTime('January 7, 2012').format('w'), '1');
        });

        it('w 14', function() {
            assert.equal(littleTime('January 8, 2012').format('w'), '2');
        });

        it('w 15', function() {
            assert.equal(littleTime('January 14, 2012').format('w'), '2');
        });

        it('w 16', function() {
            assert.equal(littleTime('January 15, 2012').format('w'), '3');
        });

        it('w (leap year)', function() {
            assert.equal(littleTime('December 31, 2016').format('w'), '53');
        });

        it('wo', function() {
            assert.equal(littleTime('January 1, 2016').format('wo'), '1st');
        });

        it('ww', function() {
            assert.equal(littleTime('January 1, 2016').format('ww'), '01');
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