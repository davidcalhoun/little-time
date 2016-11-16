# little-time
[![Build Status](https://travis-ci.org/davidcalhoun/little-time.svg?branch=master)](https://travis-ci.org/davidcalhoun/little-time)
[![Downloads][downloads-image]][npm-url]

`moment.js` is a great tool, but oftentimes folks want to use only a few of its many functions, namely time formatting and relative times (e.g. `5 minutes ago`).  To bring in all of `moment.js` just for those few simple functions ends up being a lot of wasted bandwidth and extra processing time the client needs to perform before page load.  Even if you run a dead code eliminator, you still incur extra processing time each time you need to re-minify your code, resulting in increased build times.

In response, here's a tiny alternative with just a few essential functions.  And for convenience, they have the same function signatures as `moment.js`!

## Minimalist Features:
* Only ~1.5kb gzipped
* time formatter (e.g. convert 'ddd MMM Do YYYY HH:mm:ss' to 'Fri Aug 5th 2016 16:23:45pm')
* relative time from now (e.g. '10 hours ago')
* relative time between any two times
* UTC support

## Installation

`npm install little-time`

## Examples

### format()
Time formatter syntax is the same used by [moment.js](http://momentjs.com/docs/#/displaying/format/).


#### Display current time.

##### Default formatter ('YYYY-MM-DDTHH:mm:ssZ')

```js
littleTime().format();
// "2016-08-05T16:23:45Z"
```

##### Custom formatter

```js
littleTime().format('ddd MMM Do YYYY HH:mm:ss');
// "Fri Aug 5th 2016 16:23:45"
```

#### Time formats
Anything that the native JS Date object parses can be inputted.

These are all acceptable:

```js
littleTime(1404843535580);
littleTime('Jul 07 2020 20:10:23');
littleTime(Date.now());
littleTime(new Date('Jul 07 2020 20:10:23'));
```

### Relative times (durations)

#### From now
```js
littleTime(1404843535580).fromNow();
// "2 years ago"
```

#### Duration between two times
```js
littleTime(1470338048328).from(1470368048328);
// "8 hours ago"
```

#### Duration between two times, with no "ago" or "in" suffix/prefix
```js
littleTime(1470338048328).from(1470368048328, true);
// "8 hours"
```

#### Duration between two times, one in the future
```js
littleTime(1470368048328).from(1470338048328);
// "in 8 hours"
```

#### Duration between two `little-time` instances
```js
var firstTime = littleTime('2016-08-28 12:00:00');
var secondTime = littleTime('2016-08-27 12:00:00');
firstTime.from(secondTime, true);
// "a day"
```

### UTC support.
All methods above can be used for outputting UTC times.

#### UTC default formatter
```js
littleTime.utc('2016-08-28 12:00:00-07:00').format();
// "2016-08-28T19:00:00Z"
```

#### UTC custom format function
```js
littleTime.utc('2016-08-28 12:00:00-07:00').format('ddd MMM Do YYYY hh:mm:ssa');
// "Sun Aug 28th 2016 07:00:00pm"
```

#### UTC time from now
```js
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
