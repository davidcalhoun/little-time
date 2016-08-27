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

// Constructor
var lt = function lt(datetime, isUTC) {
	// Self-instantiate if needed.
	if (!this || !(this instanceof lt)) {
	    return new lt(datetime);
	}

	this.isUTC = isUTC;

	this.datetime = (typeof datetime !== 'undefined') ? new Date(datetime) : new Date();

	return this;
};


lt.prototype._formatPiece = function(date, format) {
	switch(format) {
		// Note: order matters here

		// Month
		case 'MMMM': return months[this._dateGetter(date, 'Month')]; break;
		case 'MMM' : return months[this._dateGetter(date, 'Month')].substr(0,3); break;
		case 'MM'  : return this._dateGetter(date, 'Month', 2); break;
		case 'Mo'  : return this._dateGetter(date, 'Month') + this._getOrdinal(this._dateGetter(date, 'Month')); break;
		case 'M'   : return this._dateGetter(date, 'Month'); break;
		
		// TODO Quarter Q, Qo
		
		// Day of Year
		case 'DDDD': return this._dayOfYear(date, 3); break;
		case 'DDDo': return this._dayOfYear(date) + this._getOrdinal(this._dayOfYear(date)); break;
		case 'DDD' : return this._dayOfYear(date); break;

		// Day of Month
		case 'DD': return this._dateGetter(date, 'Date', 2); break;
		case 'Do': return this._dateGetter(date, 'Date') + this._getOrdinal(this._dateGetter(date, 'Date')); break;
		case 'D' : return this._dateGetter(date, 'Date'); break;

		// Day of Week
		case 'dddd': return days[this._dateGetter(date, 'Day')]; break;
		case 'ddd' : return days[this._dateGetter(date, 'Day')].substr(0,3); break;
		case 'dd'  : return days[this._dateGetter(date, 'Day')].substr(0,2); break;
		case 'do'  : return this._dateGetter(date, 'Day') + this._getOrdinal(this._dateGetter(date, 'Day')); break;
		case 'd'   : return this._dateGetter(date, 'Day'); break;

		// TODO e, E?
		// TODO w, wo, ww, W, Wo, WW

		// Year
		case 'yyyy': case 'YYYY': return this._dateGetter(date, 'FullYear'); break;
		case 'yy'  : case 'YY'  : return this._dateGetter(date, 'FullYear').substr(2,2); break;
		case 'y'   : case 'Y'   : return this._dateGetter(date, 'FullYear'); break;

		// TODO Week years?

		// AM/PM
		case 'A': return this._getAnteMeridiem(date).toUpperCase(); break;
		case 'a': return this._getAnteMeridiem(date); break;

		// Hour
		case 'HH': return this._dateGetter(date, 'Hours', 2); break;
		case 'H' : return this._dateGetter(date, 'Hours'); break;
		case 'hh': return this._pad(this._dateGetter(date, 'Hours') % 12, 2); break;
		case 'h' : return this._dateGetter(date, 'Hours') % 12; break;
		case 'kk': return this._pad(parseInt(this._dateGetter(date, 'Hours')) + 1, 2); break;
		case 'k' : return parseInt(this._dateGetter(date, 'Hours')) + 1; break;

		// Minute
		case 'mm': return this._dateGetter(date, 'Minutes', 2); break;
		case 'm' : return this._dateGetter(date, 'Minutes'); break;

		// Second
		case 'ss': return this._dateGetter(date, 'Seconds', 2); break;
		case 's' : return this._dateGetter(date, 'Seconds'); break;

		// Fractional Second
		case 'S'  : return Math.floor(parseInt(this._dateGetter(date, 'Milliseconds')) / 100); break;
		case 'SS'  : return Math.floor(parseInt(this._dateGetter(date, 'Milliseconds')) / 10); break;
		case 'SSS'  : return this._dateGetter(date, 'Milliseconds'); break;

		// TODO z, zz, Z, ZZ
		
		// Unix timestamp
		case 'X': return Math.floor(date.getTime() / 1000); break;
		case 'x': return date.getTime(); break;

		default:
			//  unrecognized - return unchanged
			return format;
	}
};

lt.prototype._getAnteMeridiem = function(date) {
	var hours = (this.isUTC) ? date.getUTCHours() : date.getHours();

	return (hours < 12) ? 'am' : 'pm';
};

lt.prototype._getOrdinal = function(number) {
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
};

// http://stackoverflow.com/questions/10073699/this._pad-a-number-with-leading-zeros-in-javascript
lt.prototype._pad = function(n, width, z) {
	n = n + '';
	width = width || 2;
	z = z || '0';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

lt.prototype._dateGetter = function(date, methodName, padSize) {
	var val = (this.isUTC) ? date['getUTC' + methodName]() : date['get' + methodName]();

	// Don't ever want 0th-based months.
	if (methodName === 'Month') val++;

	if (padSize && padSize > 0) {
		val = this._pad(val, padSize);
	}

	return '' + val;
};

lt.prototype._dayOfYear = function(date, padSize) {
	var year = (this.isUTC) ? date.getUTCFullYear() : date.getFullYear();
	var yearStart = new Date('1/1/' + year + ' 0:0:0');

	// timezone adjustment
	yearStart = yearStart.getTime() - yearStart.getTimezoneOffset() * 60 * 1000;

	var dayOfYear = Math.floor((date.getTime() - yearStart) / times.day + 1);

	if (padSize && padSize > 0) {
		dayOfYear = this._pad(dayOfYear, padSize);
	}

	return dayOfYear;
};


lt.prototype.format = function(format) {
	if (typeof format === 'undefined') format = 'YYYY-MM-DDTHH:mm:ssZ';

	var self = this;

	var replacer = function(match){
		return self._formatPiece(self.datetime, match, self.isUTC);
	};

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
	// Create new instance of little-time with the UTC flag set to true.
	return new lt(datetime, true);
};

return lt;

}));