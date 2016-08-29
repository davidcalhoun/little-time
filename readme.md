# little-time
[![Build Status](https://travis-ci.org/davidcalhoun/little-time.svg?branch=master)](https://travis-ci.org/davidcalhoun/little-time)

Very small library that lets you do a few things like you can in moment.js, but in a much smaller package (only 1.5kb gzipped).

## Installation

`npm install little-time`

OR

`git clone https://github.com/davidcalhoun/little-time.git`


## Examples

### Format times
Time formatters syntax is the same used by [moment.js](http://momentjs.com/docs/#/displaying/format/).

Some examples:

```js
// Get current time and use the default formatter.  These are equivalent:
littleTime().format();
// "2016-08-05T16:23:45Z"
littleTime(Date.now()).format('YYYY-MM-DDTHH:mm:ssZ');
// "2016-08-05T16:23:45Z"

// Format the current time.
littleTime().format('ddd MMM Do YYYY HH:mm:ss');
// "Fri Aug 5th 2016 16:23:45pm"

// Format arbitrary times that the JS Date object supports as inputs.
littleTime(1404843535580).format('ddd MMM Do YYYY HH:mm:ss');
// "Tue Jul 8th 2014 11:18:55"
littleTime('Jul 07 2014 20:10:23').format('ddd MMM Do YYYY hh:mm:ssa');
// "Mon Jul 7th 2014 08:10:23pm"
```

### Relative times (past and future)
```js
// From current time.
littleTime(1404843535580).fromNow();
// "2 years ago"

// Duration between two times.
littleTime(1470338048328).from(1470368048328);
// "8 hours ago"
littleTime(1470368048328).from(1470338048328);
// "in 8 hours"

// Duration between two little-time instances.
var firstTime = littleTime('2016-08-28 12:00:00');
var secondTime = littleTime('2016-08-27 12:00:00');
firstTime.from(secondTime, true);
// "a day"

// Duration with no "ago" or "in" suffix/prefix.
littleTime(1470338048328).from(1470368048328, true);
// "8 hours"
```

### UTC support.
All methods above can be used for outputting UTC times.
```js
littleTime.utc('2016-08-28 12:00:00-07:00').format();
// "2016-08-28T19:00:00Z"

littleTime.utc('2016-08-28 12:00:00-07:00').format('ddd MMM Do YYYY hh:mm:ssa');
// "Sun Aug 28th 2016 07:00:00pm"

littleTime.utc('2016-08-29 12:00:00-07:00').fromNow();
// "50 minutes ago"
```

## Changelog
* 1.1.4 from: fix logic when working with two little-time instances.
* 1.1.0 from/fromNow: support for future times.  Internal code cleanup for better minification.
* 1.0.0 API changed, fixed fatal errors from previous version.  Many formatter changes and fixes.
* 0.2.0 added fromNow() and from()
* 0.1.0 Initial version, with only formatting and UTC support

## License
MIT
