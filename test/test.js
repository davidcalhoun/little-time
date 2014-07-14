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

});

}));