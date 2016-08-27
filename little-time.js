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

var months = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var getAnteMeridiem = function(date, isUTC) {
	var hours = (isUTC) ? date.getUTCHours() : date.getHours();

	return (hours < 12) ? 'am' : 'pm';
}

var getOrdinal = function(number) {
	if (number > 10 && number < 20) {
		// all teens return 'th'
		return 'th';
	}

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

var dateGetter = function(date, methodName, isUTC, padSize) {
	var val = (isUTC) ? date['getUTC' + methodName]() : date['get' + methodName]();

	// Don't ever want 0th-based months.
	if (methodName === 'Month') val++;

	if (padSize && padSize > 0) {
		val = pad(val, padSize);
	}

	return '' + val;
};

var dayOfYear = function(date, isUTC, padSize) {
	var year = (isUTC) ? date.getUTCFullYear() : date.getFullYear();
	var yearStart = new Date('1/1/' + year + ' 0:0:0');

	// timezone adjustment
	yearStart = yearStart.getTime() - yearStart.getTimezoneOffset() * 60 * 1000;

	var dayOfYear = Math.floor((date.getTime() - yearStart) / times.day + 1);

	if (padSize && padSize > 0) {
		dayOfYear = pad(dayOfYear, padSize)
	}

	return dayOfYear;
};

var formatPiece = function(date, format, isUTC) {
	switch(format) {
		// Note: order matters here

		// Month
		case 'MMMM': return months[dateGetter(date, 'Month', isUTC)]; break;
		case 'MMM' : return months[dateGetter(date, 'Month', isUTC)].substr(0,3); break;
		case 'MM'  : return dateGetter(date, 'Month', isUTC, 2); break;
		case 'Mo'  : return dateGetter(date, 'Month', isUTC) + getOrdinal(dateGetter(date, 'Month', isUTC)); break;
		case 'M'   : return dateGetter(date, 'Month', isUTC); break;
		
		// TODO Quarter Q, Qo
		
		// Day of Year
		case 'DDDD': return dayOfYear(date, isUTC, 3); break;
		case 'DDDo': return dayOfYear(date, isUTC) + getOrdinal(dayOfYear(date, isUTC)); break;
		case 'DDD' : return dayOfYear(date, isUTC); break;

		// Day of Month
		case 'DD': return dateGetter(date, 'Date', isUTC, 2); break;
		case 'Do': return dateGetter(date, 'Date', isUTC) + getOrdinal(dateGetter(date, 'Date', isUTC)); break;
		case 'D' : return dateGetter(date, 'Date', isUTC); break;

		// Day of Week
		case 'dddd': return days[dateGetter(date, 'Day', isUTC)]; break;
		case 'ddd' : return days[dateGetter(date, 'Day', isUTC)].substr(0,3); break;
		case 'dd'  : return days[dateGetter(date, 'Day', isUTC)].substr(0,2); break;
		case 'do'  : return dateGetter(date, 'Day', isUTC) + getOrdinal(dateGetter(date, 'Day', isUTC)); break;
		case 'd'   : return dateGetter(date, 'Day', isUTC); break;

		// TODO e, E?
		// TODO w, wo, ww, W, Wo, WW

		// Year
		case 'yyyy': case 'YYYY': return dateGetter(date, 'FullYear', isUTC); break;
		case 'yy'  : case 'YY'  : return dateGetter(date, 'FullYear', isUTC).substr(2,2); break;
		case 'y'   : case 'Y'   : return dateGetter(date, 'FullYear', isUTC); break;

		// TODO Week years?

		// AM/PM
		case 'A': return getAnteMeridiem(date, isUTC).toUpperCase(); break;
		case 'a': return getAnteMeridiem(date, isUTC); break;

		// Hour
		case 'HH': return dateGetter(date, 'Hours', isUTC, 2); break;
		case 'H' : return dateGetter(date, 'Hours', isUTC); break;
		case 'hh': return pad(dateGetter(date, 'Hours', isUTC) % 12, 2); break;
		case 'h' : return dateGetter(date, 'Hours', isUTC) % 12; break;
		case 'kk': return pad(parseInt(dateGetter(date, 'Hours', isUTC)) + 1, 2); break;
		case 'k' : return parseInt(dateGetter(date, 'Hours', isUTC)) + 1; break;

		// Minute
		case 'mm': return dateGetter(date, 'Minutes', isUTC, 2); break;
		case 'm' : return dateGetter(date, 'Minutes', isUTC); break;

		// Second
		case 'ss': return dateGetter(date, 'Seconds', isUTC, 2); break;
		case 's' : return dateGetter(date, 'Seconds', isUTC); break;

		// Fractional Second
		case 'S'  : return Math.floor(parseInt(dateGetter(date, 'Milliseconds', isUTC)) / 100); break;
		case 'SS'  : return Math.floor(parseInt(dateGetter(date, 'Milliseconds', isUTC)) / 10); break;
		case 'SSS'  : return dateGetter(date, 'Milliseconds', isUTC); break;

		// TODO z, zz, Z, ZZ
		
		// Unix timestamp
		case 'X': return Math.floor(date.getTime() / 1000); break;
		case 'x': return date.getTime(); break;

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

	return format.replace(/(MMMM+|MMM+|MM+|Mo+|M+|Qo+|Q|DDDD+|DDDo+|DDD+|DD+|Do+|D+|dddd+|ddd+|dd+|do+|d+|e+|E+|wo+|ww+|w+|Wo+|WW+|W+|YYYY+|YY+|Y+|yyyy+|yy+|y+|gggg+|gg+|GGGG+|GG+|A+|a+|HH+|H+|hh+|h+|kk+|k+|mm+|m+|ss+|s+|SSS+|SS+|S+|zz+|z+|ZZ+|Z+|X+|x+)/g, replacer);
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