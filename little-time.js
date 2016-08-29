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



// TODO Quarter Q, Qo, e, E?, w, wo, ww, Wo, WW, Week years?, z, zz, Z, ZZ
lt.prototype._getPieceFormatters = function() {
	var getAnteMeridiem = this._getAnteMeridiem.bind(this);
	var month = this._dateGetter.bind(this, _jsDateMethods._month);
	var dayOfYear = this._dayOfYear.bind(this);
	var getOrdinal = this._getOrdinal.bind(this);
	var getDate = this._dateGetter.bind(this, _jsDateMethods._date);
	var getDay = this._dateGetter.bind(this, _jsDateMethods._day);
	var getFullYear = this._dateGetter.bind(this, _jsDateMethods._fullyear);
	var getHours = this._dateGetter.bind(this, _jsDateMethods._hours);
	var getMinutes = this._dateGetter.bind(this, _jsDateMethods._minutes);
	var getSeconds = this._dateGetter.bind(this, _jsDateMethods._seconds);
	var getMilliseconds = this._dateGetter.bind(this, _jsDateMethods._milliseconds);
	var pad = this._pad.bind(this);

	return [
		// Note: order matters here!

		// Month
		{
			_key: 'MMMM',
			_formatter: function() {return _months[month()];}
		},
		{
			_key: 'MMM',
			_formatter: function() {return _months[month()].substr(0,3);}
		},
		{
			_key: 'MM',
			_formatter: function() {return month(2);}
		},
		{
			_key: 'Mo',
			_formatter: function() {return month() + getOrdinal(month());}
		},
		{
			_key: 'M',
			_formatter: function() {return month();}
		},

		// Day of Year
		{
			_key: 'DDDD',
			_formatter: function() {return dayOfYear(3);}
		},
		{
			_key: 'DDDo',
			_formatter: function() {return dayOfYear() + getOrdinal(dayOfYear());}
		},
		{
			_key: 'DDD',
			_formatter: function() {return dayOfYear();}
		},

		// Day of Month
		{
			_key: 'DD',
			_formatter: function() {return getDate(2);}
		},
		{
			_key: 'Do',
			_formatter: function() {return getDate() + getOrdinal(getDate());}
		},
		{
			_key: 'D',
			_formatter: function() {return getDate();}
		},

		// Day of Week
		{
			_key: 'dddd',
			_formatter: function() {return _days[getDay()];}
		},
		{
			_key: 'ddd',
			_formatter: function() {return _days[getDay()].substr(0,3);}
		},
		{
			_key: 'dd',
			_formatter: function() {return _days[getDay()].substr(0,2);}
		},
		{
			_key: 'do',
			_formatter: function() {return getDay() + getOrdinal(getDay());}
		},
		{
			_key: 'd',
			_formatter: function() {return getDay();}
		},

		// Year
		{
			_key: 'yyyy',
			_formatter: function() {return getFullYear();}
		},
		{
			_key: 'YYYY',
			_formatter: function() {return getFullYear();}
		},
		{
			_key: 'yy',
			_formatter: function() {return getFullYear().substr(2,2);}
		},
		{
			_key: 'YY',
			_formatter: function() {return getFullYear().substr(2,2);}
		},
		{
			_key: 'y',
			_formatter: function() {return getFullYear();}
		},
		{
			_key: 'Y',
			_formatter: function() {return getFullYear();}
		},

		// AM/PM
		{
			_key: 'A',
			_formatter: function() {return getAnteMeridiem().toUpperCase();}
		},
		{
			_key: 'a',
			_formatter: function() {return getAnteMeridiem();}
		},

		// Hour
		{
			_key: 'HH',
			_formatter: function() {return getHours(2);}
		},
		{
			_key: 'H',
			_formatter: function() {return getHours();}
		},
		{
			_key: 'hh',
			_formatter: function() {return pad(getHours() % 12, 2);}
		},
		{
			_key: 'h',
			_formatter: function() {return (getHours() % 12);}
		},
		{
			_key: 'kk',
			_formatter: function() {return pad(parseInt(getHours()) + 1, 2);}
		},
		{
			_key: 'k',
			_formatter: function() {return parseInt(getHours()) + 1;}
		},

		// Minute
		{
			_key: 'mm',
			_formatter: function() {return getMinutes(2);}
		},
		{
			_key: 'm',
			_formatter: function() {return getMinutes();}
		},

		// Second
		{
			_key: 'ss',
			_formatter: function() {return getSeconds(2);}
		},
		{
			_key: 's',
			_formatter: function() {return getSeconds();}
		},

		// Fractional Second
		{
			_key: 'SSS',
			_formatter: function() {return getMilliseconds();}
		},
		{
			_key: 'SS',
			_formatter: function() {return Math.floor(parseInt(getMilliseconds()) / 10);}
		},
		{
			_key: 'S',
			_formatter: function() {return Math.floor(parseInt(getMilliseconds()) / 100);}
		},

		// Unix timestamp
		{
			_key: 'X',
			_formatter: function() {return Math.floor(this._datetime.getTime() / 1000);}
		},
		{
			_key: 'x',
			_formatter: function() {return this._datetime.getTime();}
		}
	];
};


/**
 * Formats a time based on a string formatter.  E.g. 'ddd' -> 'Fri'
 * @param {string} format
 * @example littleTime().format('ddd MMM Do YYYY HH:mm:ss');  // "Fri Aug 5th 2016 16:23:45pm"
 */
lt.prototype.format = function(format) {
	// Note: there will never be cases where a valid format is unexpectedly falsy (e.g. 0), so this is safe.
	if (!format) format = 'YYYY-MM-DDTHH:mm:ssZ';

	if (!this._pieceFormatters) {
		// Get all the piece formatter bound to this scope.
		this._pieceFormatters = this._getPieceFormatters();
		this._pieceFormatterRegex = this._pieceFormatters.map(function(formatter){return formatter._key + '+|';}).join('');
		this._pieceFormatterRegex = new RegExp(this._pieceFormatterRegex, 'g');
	}

	return format.replace(this._pieceFormatterRegex, this._formatReplacer.bind(this));
};

/**
 * Replacer for regexp used in format.
 * @param {string} piece
 * @private
 */
lt.prototype._formatReplacer = function(piece) {
	for (var formatter=0, len=this._pieceFormatters.length; formatter<len; formatter++) {
		if (piece === this._pieceFormatters[formatter]._key) {
			// Return the piece translated through its specialized formatter.
			return this._pieceFormatters[formatter]._formatter.call(this, piece);
		}
	}

	// Fallthrough
	return piece;
};

/**
 * Determines whether a time is AM or PM.
 * @private
 */
lt.prototype._getAnteMeridiem = function() {
	return (this._dateGetter(_jsDateMethods._hours) < 12) ? 'am' : 'pm';
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

		case 2:
			return 'nd';

		case 3:
			return 'rd';

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
 * Accesses the appropriate method on a JS Date object, taking into account UTC time and padding.
 * @param {string}  methodName  JS Date method name, e.g. 'Month' for date.getMonth()
 * @param {number=} padSize
 * @private
 */
lt.prototype._dateGetter = function(methodName, padSize) {
	var methodPrefix = (this._isUTC) ? 'getUTC' : 'get';
	var val = this._datetime[methodPrefix + methodName]();

	// Don't ever want 0th-based months, because it makes logic too confusing.
	if (methodName === _jsDateMethods._month) val++;

	// Add zero padding if needed.
	if (padSize > 0) {
		val = this._pad(val, padSize);
	}

	return '' + val;
};

/**
 * Determines the current day of the year (January 1 is day 1).
 * @param {number=} padSize
 * @private
 */
lt.prototype._dayOfYear = function(padSize) {
	// Get the time at the beginning of the requested year.
	var yearStart = new Date('1/1/' + this._dateGetter(_jsDateMethods._fullyear) + ' 0:0:0 Z');

	// 86400000 = ms in one day.  Would be better not to repeat this here, but we can't easily get it out of the
	// data structure above.
	var dayOfYear = Math.floor((this._datetime.getTime() - yearStart) / 86400000 + 1);

	// Add zero padding if needed.
	if (padSize > 0) {
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
	if (timeB instanceof lt) {
		timeB = timeB._datetime;
	}

	var diff = timeB - this._datetime;
	var isFuture = false;

	// Date is in the future.
	if (diff < 0) {
		// Set flag for suffix handling below.
		isFuture = true;

		// Set to absolute value so we can reuse the same time logic below.
		diff = Math.abs(diff);
	}

	// Find the closest text match, starting from seconds and progressing to years.
	var fromText;
	for (var time=0, len=_times.length; time<len; time++) {
		if (diff < _times[time]._ms) {
			// Text match found for this time range.

			if (_times[time]._displayNumber) {
				// Display with a number, e.g. '8 minutes', '2 hours', etc.
				fromText = Math.floor(diff / _times[time - 2]._ms) + ' ' + _times[time]._decomposed;
			} else {
				// Display with hardcoded value, e.g. 'a few seconds ago', 'a minute', etc
				fromText = _times[time]._decomposed;
			}

			// Match found, so the job is done - break out of for loop.
			break;
		}

		// Fallthrough condition
		fromText = Math.floor(diff / _times[_times.length - 2]._ms) + ' years';
	}

	// Suffix/prefix handling.
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