describe('from', function(){
    var littleTime, mocha, assert;
    before(function(){
        littleTime = require('../little-time');
        mocha = require('mocha');
        assert = require('assert');
    });

    it('diffs between two littleTime instances', function() {
		var firstTime = littleTime('2016-08-28 12:00:00-07:00');
		var secondTime = littleTime('2016-08-27 12:00:00-07:00');

		assert.equal(firstTime.from(secondTime, true), 'a day');
    });

});