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

var _times = {
	_minute: 60000,
	_twoMinutes: 120000,
	_hour: 3600000,
	_twoHours: 7200000,
	_day: 86400000,
	_twoDays: 172800000,
	_month: 2678400000,
	_twoMonths: 5356800000,
	_year: 31536000000,
	_twoYears: 63072000000
};

var _jsDateMethods = {
	_month: 'Month',
	_date: 'Date',
	_day: 'Day',
	_fullyear: 'FullYear',
	_hours: 'Hours',
	_minutes: 'Minutes',
	_seconds: 'Seconds',
	_milliseconds: 'Milliseconds'
};

var _months = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var _days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Constructor
var lt = function lt(datetime, isUTC) {
	// Self-instantiate if needed.
	if (!this || !(this instanceof lt)) {
	    return new lt(datetime);
	}

	this._isUTC = isUTC;

	this._datetime = (typeof datetime !== 'undefined') ? new Date(datetime) : new Date();

	return this;
};


/**
 * @private
 */
lt.prototype._formatPiece = function(date, format) {
	switch(format) {
		// Note: order matters here

		// Month
		case 'MMMM': return _months[this._dateGetter(date, _jsDateMethods._month)]; break;
		case 'MMM' : return _months[this._dateGetter(date, _jsDateMethods._month)].substr(0,3); break;
		case 'MM'  : return this._dateGetter(date, _jsDateMethods._month, 2); break;
		case 'Mo'  : return this._dateGetter(date, _jsDateMethods._month) + this._getOrdinal(this._dateGetter(date, _jsDateMethods._month)); break;
		case 'M'   : return this._dateGetter(date, _jsDateMethods._month); break;
		
		// TODO Quarter Q, Qo
		
		// Day of Year
		case 'DDDD': return this._dayOfYear(date, 3); break;
		case 'DDDo': return this._dayOfYear(date) + this._getOrdinal(this._dayOfYear(date)); break;
		case 'DDD' : return this._dayOfYear(date); break;

		// Day of Month
		case 'DD': return this._dateGetter(date, _jsDateMethods._date, 2); break;
		case 'Do': return this._dateGetter(date, _jsDateMethods._date) + this._getOrdinal(this._dateGetter(date, _jsDateMethods._date)); break;
		case 'D' : return this._dateGetter(date, _jsDateMethods._date); break;

		// Day of Week
		case 'dddd': return _days[this._dateGetter(date, _jsDateMethods._day)]; break;
		case 'ddd' : return _days[this._dateGetter(date, _jsDateMethods._day)].substr(0,3); break;
		case 'dd'  : return _days[this._dateGetter(date, _jsDateMethods._day)].substr(0,2); break;
		case 'do'  : return this._dateGetter(date, _jsDateMethods._day) + this._getOrdinal(this._dateGetter(date, _jsDateMethods._day)); break;
		case 'd'   : return this._dateGetter(date, _jsDateMethods._day); break;

		// TODO e, E?
		// TODO w, wo, ww, W, Wo, WW

		// Year
		case 'yyyy': case 'YYYY': return this._dateGetter(date, _jsDateMethods._fullyear); break;
		case 'yy'  : case 'YY'  : return this._dateGetter(date, _jsDateMethods._fullyear).substr(2,2); break;
		case 'y'   : case 'Y'   : return this._dateGetter(date, _jsDateMethods._fullyear); break;

		// TODO Week years?

		// AM/PM
		case 'A': return this._getAnteMeridiem(date).toUpperCase(); break;
		case 'a': return this._getAnteMeridiem(date); break;

		// Hour
		case 'HH': return this._dateGetter(date, _jsDateMethods._hours, 2); break;
		case 'H' : return this._dateGetter(date, _jsDateMethods._hours); break;
		case 'hh': return this._pad(this._dateGetter(date, _jsDateMethods._hours) % 12, 2); break;
		case 'h' : return this._dateGetter(date, _jsDateMethods._hours) % 12; break;
		case 'kk': return this._pad(parseInt(this._dateGetter(date, _jsDateMethods._hours)) + 1, 2); break;
		case 'k' : return parseInt(this._dateGetter(date, _jsDateMethods._hours)) + 1; break;

		// Minute
		case 'mm': return this._dateGetter(date, _jsDateMethods._minutes, 2); break;
		case 'm' : return this._dateGetter(date, _jsDateMethods._minutes); break;

		// Second
		case 'ss': return this._dateGetter(date, _jsDateMethods._seconds, 2); break;
		case 's' : return this._dateGetter(date, _jsDateMethods._seconds); break;

		// Fractional Second
		case 'S'  : return Math.floor(parseInt(this._dateGetter(date, _jsDateMethods._milliseconds)) / 100); break;
		case 'SS'  : return Math.floor(parseInt(this._dateGetter(date, _jsDateMethods._milliseconds)) / 10); break;
		case 'SSS'  : return this._dateGetter(date, _jsDateMethods._milliseconds); break;

		// TODO z, zz, Z, ZZ
		
		// Unix timestamp
		case 'X': return Math.floor(date.getTime() / 1000); break;
		case 'x': return date.getTime(); break;

		default:
			//  unrecognized - return unchanged
			return format;
	}
};

/**
 * @private
 */
lt.prototype._getAnteMeridiem = function(date) {
	var hours = (this._isUTC) ? date.getUTCHours() : date.getHours();

	return (hours < 12) ? 'am' : 'pm';
};

/**
 * @private
 */
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

/**
 * @private
 */
lt.prototype._dateGetter = function(date, methodName, padSize) {
	var val = (this._isUTC) ? date['getUTC' + methodName]() : date['get' + methodName]();

	// Don't ever want 0th-based months.
	if (methodName === 'Month') val++;

	if (padSize && padSize > 0) {
		val = this._pad(val, padSize);
	}

	return '' + val;
};

/**
 * @private
 */
lt.prototype._dayOfYear = function(date, padSize) {
	var year = (this._isUTC) ? date.getUTCFullYear() : date.getFullYear();
	var yearStart = new Date('1/1/' + year + ' 0:0:0');

	// timezone adjustment
	yearStart = yearStart.getTime() - yearStart.getTimezoneOffset() * 60 * 1000;

	var dayOfYear = Math.floor((date.getTime() - yearStart) / _times._day + 1);

	if (padSize && padSize > 0) {
		dayOfYear = this._pad(dayOfYear, padSize);
	}

	return dayOfYear;
};


lt.prototype.format = function(format) {
	if (typeof format === 'undefined') format = 'YYYY-MM-DDTHH:mm:ssZ';

	var self = this;

	var replacer = function(match){
		return self._formatPiece(self._datetime, match, self._isUTC);
	};

	return format.replace(/(MMMM+|MMM+|MM+|Mo+|M+|Qo+|Q|DDDD+|DDDo+|DDD+|DD+|Do+|D+|dddd+|ddd+|dd+|do+|d+|e+|E+|wo+|ww+|w+|Wo+|WW+|W+|YYYY+|YY+|Y+|yyyy+|yy+|y+|gggg+|gg+|GGGG+|GG+|A+|a+|HH+|H+|hh+|h+|kk+|k+|mm+|m+|ss+|s+|SSS+|SS+|S+|zz+|z+|ZZ+|Z+|X+|x+)/g, replacer);
};


/**
 * @param timeB Unix timestamp in milliseconds.
 * @example littleTime(1404843535580).from(1470367465850);
 */
lt.prototype.from = function(timeB) {
	var diff = timeB - this._datetime;

	// past times fallthrough
	if (diff < _times._minute) {
		return 'a few seconds ago';
	} else if (diff < _times._twoMinutes) {
		return 'a minute ago';
	} else if (diff < _times._hour) {
		return Math.floor(diff / _times._minute) + ' minutes ago';
	} else if (diff < _times._twoHours) {
		return 'an hour ago';
	} else if (diff < _times._day) {
		return Math.floor(diff / _times._hour) + ' hours ago';
	} else if (diff < _times._twoDays) {
		return 'a day ago';
	} else if (diff < _times._month) {
		return Math.floor(diff / _times._day) + ' days ago';
	} else if (diff < _times._twoMonths) {
		return 'a month ago';
	} else if (diff < _times._year) {
		return Math.floor(diff / _times._month) + ' months ago';
	} else if (diff < _times._twoYears) {
		return 'a year ago';
	} else {
		return Math.floor(diff / _times._year) + ' years ago';
	}

	// todo: future times
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