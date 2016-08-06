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

'use strict';

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


var getAnteMeridiem = function(date, isUTC) {
	var hours = (isUTC) ? date.getUTCHours() : date.getHours();

	return (hours < 12) ? 'am' : 'pm';
}

var getOrdinal = function(number) {
	var mod = number % 10;

	switch(mod) {
		case 1:
			return 'st';
		break;

		case 2:
			return 'nd';
		break;

		case 3:
			return 'rd';
		break;

		default:
			return 'th';
	}
}

// http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
var pad = function(n, width, z) {
	n = n + '';
	width = width || 2;
	z = z || '0';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


var dayOfYear = function(date, padSize, isUTC) {
	var year = (isUTC) ? date.getUTCFullYear() : date.getFullYear();
	var base = new Date('01-01-' + year);
	var baseMS = base.getTime();  // Note: Unix timestamps are already in UTC here.
	var diffMS = date.getTime() - baseMS;

	var dayOfYear = Math.floor(diffMS / times.day) + 1;

	if (typeof padSize === 'undefined') padSize = 0;

	if (padSize > 0) {
		return pad(dayOfYear, padSize);
	} else {
		return dayOfYear;
	}
};

var formatPiece = function(date, format, isUTC) {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	switch(format) {
		// Note: order matters in the regexp itself!
		case 'MMMM': return months[(isUTC) ? date.getUTCMonth() : date.getMonth()]; break;
		case 'MMM' : return months[(isUTC) ? date.getUTCMonth() : date.getMonth()].substr(0,3); break;
		case 'MM'  : return pad(((isUTC) ? date.getUTCMonth() : date.getMonth()) + 1); break;
		case 'Mo' : return (isUTC) ? (date.getUTCMonth() + 1) + getOrdinal(date.getUTCMonth() + 1) : (date.getMonth() + 1) + getOrdinal(date.getMonth() + 1); break;
		case 'M'   : return ((isUTC) ? date.getUTCMonth() + 1 : date.getMonth()) + 1; break;
		// TODO Q, Qo
		case 'DDDD' : return dayOfYear(date, 3, isUTC); break;
		case 'DDDo' : return dayOfYear(date, 0, isUTC) + getOrdinal(dayOfYear(date, 0, isUTC)); break;
		case 'DDD' : return dayOfYear(date, 0, isUTC); break;
		case 'DD' : return (isUTC) ? pad(date.getUTCDate()) : pad(date.getDate()); break;
		case 'Do' : return (isUTC) ? date.getUTCDate() + getOrdinal(date.getUTCDate()) : date.getDate() + getOrdinal(date.getUTCDate()); break;
		case 'D'  : return (isUTC) ? date.getUTCDate() : date.getDate(); break;
		// TODO DDD, DDDo, DDDD
		// TODO do
		case 'dddd': return days[(isUTC) ? date.getUTCDay() : date.getDay()]; break;
		case 'ddd' : return days[(isUTC) ? date.getUTCDay() : date.getDay()].substr(0,3); break;
		case 'dd'  : return days[(isUTC) ? date.getUTCDay() : date.getDay()].substr(0,2); break;
		case 'd'   : return (isUTC) ? date.getUTCDay() : date.getDay(); break;
		// TODO e, E?
		// TODO w, wo, ww, W, Wo, WW
		case 'yyyy': case 'YYYY' : return (isUTC) ? date.getUTCFullYear() : date.getFullYear(); break;
		case 'yy'  : case 'YY' : return ('' + ((isUTC) ? date.getUTCFullYear() : date.getFullYear())).substr(2,2); break;
		case 'y': case 'Y' : return (isUTC) ? date.getUTCFullYear() : date.getFullYear(); break;
		// TODO Week years?
		case 'A'  : return getAnteMeridiem(date, isUTC).toUpperCase(); break;
		case 'a'  : return getAnteMeridiem(date, isUTC); break;
		case 'HH'  : return pad((isUTC) ? date.getUTCHours() : date.getHours()); break;
		case 'H'   : return (isUTC) ? date.getUTCHours() : date.getHours(); break;
		case 'hh'  : return pad((isUTC) ? date.getUTCHours() : date.getHours() % 12); break;
		case 'h'   : return ((isUTC) ? date.getUTCHours() : date.getHours() % 12); break;
		case 'kk'  : return pad((isUTC) ? date.getUTCHours() + 1 : date.getHours() + 1); break;
		case 'k'   : return (isUTC) ? date.getUTCHours() + 1 : date.getHours() + 1; break;
		case 'mm'  : return pad((isUTC) ? date.getUTCMinutes() : date.getMinutes()); break;
		case 'm'   : return (isUTC) ? date.getUTCMinutes() : date.getMinutes(); break;
		case 'ss'  : return pad((isUTC) ? date.getUTCSeconds() : date.getSeconds()); break;
		case 's'   : return (isUTC) ? date.getUTCSeconds() : date.getSeconds(); break;
		case 'SSS'   : return (isUTC) ? date.getUTCMilliseconds() : date.getMilliseconds(); break;
		case 'SS'   : return (isUTC) ? Math.floor(date.getUTCMilliseconds() / 10) : Math.floor(date.getMilliseconds() / 10); break;
		case 'S'   : return (isUTC) ? Math.floor(date.getUTCMilliseconds() / 100) : Math.floor(date.getMilliseconds() / 100); break;
		// TODO z, zz, Z, ZZ
		case 'X' : return Math.floor(date.getTime() / 100); break;
		case 'x' : return date.getTime(); break;

		default:
			//  unrecognized - return unchanged
			return format;
	}
}





// Constructor
var lt = function lt(datetime, isUTC) {
	// Self-instantiate if needed.
	if (!this || !this instanceof lt) {
	    return new lt(datetime);
	}

	this.isUTC = isUTC;

	this.datetime = (typeof datetime !== 'undefined') ? new Date(datetime) : new Date();

	return this;
};

lt.prototype.format = function(format) {
	if (typeof format === 'undefined') format = 'YYYY-MM-DDTHH:mm:ssZ';

	var self = this;

	var replacer = function(match){
		return formatPiece(self.datetime, match, self.isUTC);
	}

	return format.replace(/(MMMM+|MMM+|MM+|Mo+|M+|Qo+|Q|DDDD+|DDDo+|DDD+|DD+|Do+|D+|dddd+|ddd+|dd+|do+|d+|e+|E+|wo+|ww+|w+|Wo+|WW+|W+|YYYY+|YY+|Y+|gggg+|gg+|GGGG+|GG+|A+|a+|HH+|H+|hh+|h+|kk+|k+|mm+|m+|ss+|s+|SSS+|SS+|S+|zz+|z+|ZZ+|Z+|X+|x+)/g, replacer);
};


/**
 * @param timeB Unix timestamp in milliseconds.
 * @example littleTime(1404843535580).from(1470367465850);
 */
lt.prototype.from = function(timeB) {
	var diff = timeB - this.datetime;

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

	return this;
};

// e.g. littleTime(1404843535580).fromNow();
lt.prototype.fromNow = function() {
	return this.from(Date.now());
};

lt.utc = function(datetime) {
	var isUTC = true;

	return new lt(datetime, isUTC);
};

return lt;

}));