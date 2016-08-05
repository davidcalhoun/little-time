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

	var time;
	if (typeof format != 'undefined') {
		time = format.replace(/(l+|L+|ss+|s+|MM+|M+|HH+|H+|hh+|h+|TT+|T+|tt+|t+|Z+|o+|S+|dddd+|ddd+|dd+|d+|mmmm+|mmm+|mm+|m+|yyyy+|yy+)/g, replacer);
	} else {
		time = date;
	}

	/**
	 * @param timeB Unix timestamp in milliseconds.
	 * @example littleTime(1404843535580).from(1470367465850);
	 */
	context.from = function(timeB) {
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

		var diff = timeB - time;

		// past times fallthrough
		if (diff < times.minute) {
			return 'a few seconds ago';
		} else if (diff < times.twoMinutes) {
			return 'a minute ago';
		} else if (diff < times.hour) {
			return Math.floor(diff / times.minute) + ' minutes ago';
		} else if (diff < times.twoHours) {
			return 'an hour ago';
		} else if (diff < times.day) {
			return Math.floor(diff / times.hour) + ' hours ago';
		} else if (diff < times.twoDays) {
			return 'a day ago';
		} else if (diff < times.month) {
			return Math.floor(diff / times.day) + ' days ago';
		} else if (diff < times.twoMonths) {
			return 'a month ago';
		} else if (diff < times.year) {
			return Math.floor(diff / times.month) + ' months ago';
		} else if (diff < times.twoYears) {
			return 'a year ago';
		} else {
			return Math.floor(diff / times.year) + ' years ago';
		}

		// todo: future times
	};

	// e.g. littleTime(1404843535580).fromNow();
	context.fromNow = function() {
		return context.from(Date.now());
	}

	// for simple API usage without chaining (e.g. littleTime())
	context.toString = function() {
		return time;
	};

	return context;
};

}));