little-time
===========
Little time formatter, for when you don't have time for the whole kitchen sink


===========
Install

`npm install`


===========
Very small library that lets you do a few things like you can in moment.js, but much smaller (only 1kb gzipped).

## Format times
Time formatters are the same used by [moment.js](http://momentjs.com/docs/#/displaying/format/).

Some examples:

```js
// Get current time and use the default formatter.  These are equivalent:
littleTime().format();                                      // "2016-08-05T16:23:45Z"
littleTime(Date.now()).format('YYYY-MM-DDTHH:mm:ssZ');      // "2016-08-05T16:23:45Z"

// Format current time
littleTime().format('ddd MMM Do YYYY HH:mm:ss');                          // "Fri Aug 5th 2016 16:23:45pm"

// Format arbitrary times that the JS Date object supports as inputs.
littleTime(1404843535580).format('ddd MMM Do YYYY HH:mm:ss');             // "Tue Jul 8th 2014 11:18:55"
littleTime('Jul 07 2014 20:10:23').format('ddd MMM Do YYYY hh:mm:ssa');   // "Mon Jul 7th 2014 08:10:23pm"

// UTC time support
littleTime.utc().format();                                  // "2016-08-05T23:23:45Z"
littleTime.utc().format('ddd MMM Do YYYY hh:mm:ssa');       // "Fri Aug 5th 2016 23:23:45pm"
```

## Relative times
```js
littleTime(1404843535580).fromNow();            // "2 years ago"

// Relative time between two arbitrary times.
littleTime(1470338048328).from(1470368048328);  // "8 hours ago"
```

## TODO
* More tests
* Relative times: support for times in the future (e.g. "in two hours")

## Changelog
* 1.0.0 API changed, fixed fatal errors from previous version.  Many formatter changes and fixes.
* 0.2.0 added fromNow() and from()
* 0.1.0 Initial version, with only formatting (with UTC support)