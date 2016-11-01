# little-time
[![Build Status](https://travis-ci.org/davidcalhoun/little-time.svg?branch=master)](https://travis-ci.org/davidcalhoun/little-time)
[![Downloads][downloads-image]][npm-url]

The motivation behind this project is that I've seen a lot of code that only use a few functions from `moment.js`, which is a great tool.  The primary use case seems to be time formatting and getting relative times - but to bring in all of `moment.js` just for those few simple functions is too much.  So here's a tiny alternative - with the same function signatures as `moment.js` for convenience!

Minimalist Features:
* time formatter (e.g. convert 'ddd MMM Do YYYY HH:mm:ss' to 'Fri Aug 5th 2016 16:23:45pm')
* get the relative time from now (e.g. '10 hours ago')
* get the relative time between any two times
* UTC support
* Only ~1.5kb gzipped

## Installation

`npm install little-time`

## Examples

### format()
Time formatter syntax is the same used by [moment.js](http://momentjs.com/docs/#/displaying/format/).


#### Display current time.
Some examples:

```js
// Display current time (uses the default formatter 'YYYY-MM-DDTHH:mm:ssZ'):
littleTime().format();
// "2016-08-05T16:23:45Z"

// Custom formatter.
littleTime().format('ddd MMM Do YYYY HH:mm:ss');
// "Fri Aug 5th 2016 16:23:45pm"
```

#### Display arbitrary time.
Anything that the native JS Date object parses can be inputted.

These are all acceptable:

```js
littleTime(1404843535580);
littleTime('Jul 07 2020 20:10:23');
littleTime(Date.now());
littleTime(new Date('Jul 07 2020 20:10:23'));
```

### Durations
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
* 1.1.7 added formatters for quarter (Q, Qo), non-iso week of year (w, ww, wo)
* 1.1.4 from: fix logic when working with two little-time instances.
* 1.1.0 from/fromNow: support for future times.  Internal code cleanup for better minification.
* 1.0.0 API changed, fixed fatal errors from previous version.  Many formatter changes and fixes.
* 0.2.0 added fromNow() and from()
* 0.1.0 Initial version, with only formatting and UTC support

## License
MIT

[downloads-image]: https://img.shields.io/npm/dt/little-time.svg
[npm-url]: https://www.npmjs.com/package/little-time
[npm-image]: https://img.shields.io/npm/v/little-time.svg
