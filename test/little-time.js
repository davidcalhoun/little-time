describe('little-time', function(){
    var littleTime, mocha, assert;
    before(function(){
        littleTime = require('../little-time');
        mocha = require('mocha');
        assert = require('assert');
    });

    it('is exported as an npm module', function(){
        var localLittleTime = require('../little-time.js');
        assert.equal(typeof localLittleTime, 'function');
    });
});