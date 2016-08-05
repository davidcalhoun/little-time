little-time
===========
Little time formatter, for when you don't have time for the whole kitchen sink


===========
Install

`npm install`


===========
Very small library that lets you do a few things like you can in moment.js, but much smaller (only 1kb gzipped).

## Format times
```js
littleTime(1404843535580, 'ddd mmm ddS yyyy HH:MM:ss')             //  "Tue Jul 08th 2014 11:18:55"
littleTime('Jul 07 2014 20:10:23', 'ddd mmm ddS yyyy hh:MM:sstt')  //  "Mon Jul 07th 2014 08:10:23pm"
littleTime(Date.now(), 'dd-mm-yyyy hh:MM:ssTT')                    //  "08-07-2014 11:24:13AM"
littleTime(new Date(), 'dd-mm-yyyy hh:MM:ssTT')                    //  "08-07-2014 11:25:31AM"

//  UTC time
littleTime(new Date(), 'dd-mm-yyyy hh:MM:ssTT', true)              //  "08-07-2014 18:25:59PM"
```

## Relative times
```js
littleTime(1404843535580).fromNow();            // "2 years ago"
littleTime(1470338048328).from(1470368048328);  // "8 hours ago"
```