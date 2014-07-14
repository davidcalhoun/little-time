(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['require'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.littleTime = factory();
    }
}(this, function() {

return function(date, format, isUTC) {
	'use strict';

	var date = new Date(date) || new Date();

	function replacer(match){
		return formatPiece(date, match);
	}

	function formatPiece(date, format) {
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		switch(format) {
			case 'l'   : return (isUTC) ? date.getUTCMilliseconds() : date.getMilliseconds(); break;
			case 'L'   : return ('' + ((isUTC) ? date.getUTCMilliseconds() : date.getMilliseconds())).substr(0,2); break;
			case 'ss'  : return pad((isUTC) ? date.getUTCSeconds() : date.getSeconds()); break;
			case 's'   : return (isUTC) ? date.getUTCSeconds() : date.getSeconds(); break;
			case 'MM'  : return pad((isUTC) ? date.getUTCMinutes() : date.getMinutes()); break;
			case 'M'   : return (isUTC) ? date.getUTCMinutes() : date.getMinutes(); break;
			case 'hh'  : return pad((isUTC) ? date.getUTCHours() : date.getHours() % 12); break;
			case 'h'   : return ((isUTC) ? date.getUTCHours() : date.getHours() % 12); break;
			case 'HH'  : return pad((isUTC) ? date.getUTCHours() : date.getHours()); break;
			case 'H'   : return (isUTC) ? date.getUTCHours() : date.getHours(); break;
			case 'tt'  : return getAnteMeridiem(date, isUTC); break;
			case 't'   : return getAnteMeridiem(date, isUTC).substr(0,1); break;
			case 'TT'  : return getAnteMeridiem(date, isUTC).toUpperCase(); break;
			case 'T'   : return getAnteMeridiem(date, isUTC).toUpperCase().substr(0,1); break;
			case 'd'   : return (isUTC) ? date.getUTCDate() : date.getDate(); break;
			case 'dd'  : return pad((isUTC) ? date.getUTCDate() : date.getDate()); break;
			case 'ddd' : return days[(isUTC) ? date.getUTCDay() : date.getDay()].substr(0,3); break;
			case 'dddd': return days[(isUTC) ? date.getUTCDay() : date.getDay()]; break;
			case 'S'   : return getOrdinal(date, isUTC); break;
			case 'm'   : return ((isUTC) ? date.getUTCMonth() : date.getMonth()) + 1; break;
			case 'mm'  : return pad(((isUTC) ? date.getUTCMonth() : date.getMonth()) + 1); break;
			case 'mmm' : return months[(isUTC) ? date.getUTCMonth() : date.getMonth()].substr(0,3); break;
			case 'mmmm': return months[(isUTC) ? date.getUTCMonth() : date.getMonth()]; break;
			case 'yy'  : return ('' + ((isUTC) ? date.getUTCFullYear() : date.getFullYear())).substr(2,2); break;
			case 'yyyy': return (isUTC) ? date.getUTCFullYear() : date.getFullYear(); break;

			default:
				//  unrecognized - return unchanged
				return format;
		}
	}

	function getAnteMeridiem(date, isUTC) {
		var hours = (isUTC) ? date.getUTCHours() : date.getHours();
		return (hours < 12) ? 'am' : 'pm';
	}

	function getOrdinal(date, isUTC) {
		var date = (isUTC) ? date.getUTCDate() : date.getDate();

		switch(date) {
			case 1: case 21: case 31:
				return 'st';
			break;

			case 2: case 22:
				return 'nd';
			break;

			case 3: case 23:
				return 'rd';
			break;

			default:
				return 'th';
		}
	}

	// http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
	function pad(n, width, z) {
		n = n + '';
		width = width || 2;
		z = z || '0';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	return format.replace(/(l+|L+|ss+|s+|MM+|M+|HH+|H+|hh+|h+|TT+|T+|tt+|t+|Z+|o+|S+|dddd+|ddd+|dd+|d+|mmmm+|mmm+|mm+|m+|yyyy+|yy+)/g, replacer);
};

}));