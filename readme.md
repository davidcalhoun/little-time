# little-time
[![Build Status](https://travis-ci.org/davidcalhoun/little-time.svg?branch=master)](https://travis-ci.org/davidcalhoun/little-time)

Very small library that lets you do a few things like you can in moment.js, but in a much smaller package (only 1.5kb gzipped).

## Installation

`npm install little-time`

OR

`git clone https://github.com/davidcalhoun/little-time.git`


## Examples

### Format times
Time formatters are the same used by [moment.js](http://momentjs.com/docs/#/displaying/format/).

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

// UTC time support.
littleTime.utc().format();
// "2016-08-05T23:23:45Z"
littleTime.utc().format('ddd MMM Do YYYY hh:mm:ssa');
// "Fri Aug 5th 2016 23:23:45pm"
```

### Relative times (past and future)
```js
littleTime(1404843535580).fromNow();
// "2 years ago"

// Relative time between two arbitrary times.
littleTime(1470338048328).from(1470368048328);
// "8 hours ago"
littleTime(1470368048328).from(1470338048328);
// "in 8 hours"

// Relative time with "ago" or "in" suffix/prefix removed.
littleTime(1470338048328).from(1470368048328, true);
// "8 hours"

// Hide "ago" suffix
```

## Changelog
* 1.1.0 from/fromNow: support for future times.  Internal code cleanup for better minification.
* 1.0.0 API changed, fixed fatal errors from previous version.  Many formatter changes and fixes.
* 0.2.0 added fromNow() and from()
* 0.1.0 Initial version, with only formatting (with UTC support)

## License
MIT
