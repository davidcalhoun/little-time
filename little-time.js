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

// Time constants based in milliseconds.
var _times = [
	{	
		// minute
		_ms: 60000,
		_decomposed: 'a few seconds'
	},
	{
		// twoMinutes
		_ms: 120000,
		_decomposed: 'a minute'
	},
	{
		// hour
		_ms: 3600000,
		_decomposed: 'minutes',
		_displayNumber: true
	},
	{
		// twoHours
		_ms: 7200000,
		_decomposed: 'an hour'
	},
	{
		// day
		_ms: 86400000,
		_decomposed: 'hours',
		_displayNumber: true
	},
	{
		// twoDays
		_ms: 172800000,
		_decomposed: 'a day'
	},
	{
		// month
		_ms: 2678400000,
		_decomposed: 'days',
		_displayNumber: true
	},
	{
		// twoMonths
		_ms: 5356800000,
		_decomposed: 'a month'
	},
	{
		// year
		_ms: 31536000000,
		_decomposed: 'months',
		_displayNumber: true
	},
	{
		// twoYears
		_ms: 63072000000,
		_decomposed: 'a year'
	}
];

// Date method names, e.g. 'Month' for date.getMonth() and date.getUTCMonth()
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

// Names of the months of the year.  Index 0 is null because we never want 0th-based months (makes things confusing).
var _months = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Names of the days of the week.
var _days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


/*
 * @param {(number|string)=} datetime  Defaults to now.
 * @param {boolean}          isUTC
 * @constructor
 */
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
 * Formats a time based on a string formatter.
 * @param {string} format
 * @example littleTime().format('ddd MMM Do YYYY HH:mm:ss');  // "Fri Aug 5th 2016 16:23:45pm"
 */
lt.prototype.format = function(format) {
	if (typeof format === 'undefined') format = 'YYYY-MM-DDTHH:mm:ssZ';

	var self = this;

	var replacer = function(match){
		return self._formatPiece(self._datetime, match, self._isUTC);
	};

	return format.replace(/(MMMM+|MMM+|MM+|Mo+|M+|Qo+|Q|DDDD+|DDDo+|DDD+|DD+|Do+|D+|dddd+|ddd+|dd+|do+|d+|e+|E+|wo+|ww+|w+|Wo+|WW+|W+|YYYY+|YY+|Y+|yyyy+|yy+|y+|gggg+|gg+|GGGG+|GG+|A+|a+|HH+|H+|hh+|h+|kk+|k+|mm+|m+|ss+|s+|SSS+|SS+|S+|zz+|z+|ZZ+|Z+|X+|x+)/g, replacer);
};

/**
 * Replacer for regexp used in format.
 * @param {object} date
 * @param {string} format
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
 * Determines whether a time is AM or PM.
 * @param {object} date Native JS Date object.
 * @private
 */
lt.prototype._getAnteMeridiem = function(date) {
	var hours = this._dateGetter(date, _jsDateMethods._hours);

	return (hours < 12) ? 'am' : 'pm';
};

/**
 * Determines what ordinal to append to a number (e.g. 'st' for 1, 'nd' for 2).
 * @param {number} number
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

/**
 * Pads a number with leading zeroes.
 * @param {number}  n
 * @param {number=} width
 * @param {string=} z      Pad character
 */
lt.prototype._pad = function(n, width, z) {
	n = n + '';
	width = width || 2;
	z = z || '0';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

/**
 * Accesses the appropriate method on a JS Date object.
 * @param {object}  date        Native JS Date object
 * @param {string}  methodName  JS Date method name, e.g. 'Month' for date.getMonth()
 * @param {number=} padSize
 * @private
 */
lt.prototype._dateGetter = function(date, methodName, padSize) {
	var val = (this._isUTC) ? date['getUTC' + methodName]() : date['get' + methodName]();

	// Don't ever want 0th-based months, because it makes things confusing.
	if (methodName === _jsDateMethods._month) val++;

	if (padSize && padSize > 0) {
		val = this._pad(val, padSize);
	}

	return '' + val;
};

/**
 * Determines the current day of the year (January 1 is day 1).
 * @param {object}  date     Native JS Date object
 * @param {number=} padSize
 * @private
 */
lt.prototype._dayOfYear = function(date, padSize) {
	var year = this._dateGetter(date, _jsDateMethods._fullyear);
	var yearStart = new Date('1/1/' + year + ' 0:0:0');

	// timezone adjustment
	yearStart = yearStart.getTime() - yearStart.getTimezoneOffset() * 60 * 1000;

	var dayOfYear = Math.floor((date.getTime() - yearStart) / 86400000 + 1);

	if (padSize && padSize > 0) {
		dayOfYear = this._pad(dayOfYear, padSize);
	}

	return dayOfYear;
};


/**
 * Creates a display-friendly time length.
 * @param {number}  timeB       Unix timestamp in milliseconds.
 * @param {boolean} hideSuffix  Whether to hide the 'ago' or 'in'.
 * @example littleTime(1404843535580).from(1470367465850, true);  // "2 years"
 */
lt.prototype.from = function(timeB, hideSuffix) {
	var diff = timeB - this._datetime;

	var isFuture = false;

	// Date is in the future.  Set to absolute value so we can reuse time logic below.
	if (diff < 0) {
		isFuture = true;
		diff = Math.abs(diff);
	}

	// Find the closest text match, starting from seconds and progressing to years.
	var fromText;
	for (var time=0, len=_times.length; time<len; time++) {
		if (diff < _times[time]._ms) {
			// Text match found.

			if (_times[time]._displayNumber) {
				// '8 minutes', '2 hours', etc.
				fromText = Math.floor(diff / _times[time - 2]._ms) + ' ' + _times[time]._decomposed;
			} else {
				// 'a few seconds ago', 'a minute', etc
				fromText = _times[time]._decomposed;
			}
			break;
		}

		fromText = Math.floor(diff / _times[_times.length - 2]._ms) + ' years';
	}

	if (!hideSuffix) {
		if (isFuture) {
			fromText = 'in ' + fromText;
		} else {
			fromText += ' ago';
		}
	}

	return fromText;
};

/**
 * Creates a display-friendly time length from current time.
 * @example littleTime(1404843535580).fromNow();
 */
lt.prototype.fromNow = function() {
	return this.from(Date.now());
};

/**
 * Special constructor for always displaying UTC time.
 * @param {number} datetime
 * @constructor
 */
lt.utc = function(datetime) {
	// Create new instance of little-time with the UTC flag set to true.
	return new lt(datetime, true);
};

return lt;

}));