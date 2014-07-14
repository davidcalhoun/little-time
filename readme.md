little-time
===========
Little time formatter, for when you don't have time for the whole kitchen sink


===========
792 byte library (gzipped and minified) that lets you do this:

```
littleTime(1404843535580, 'ddd mmm ddS yyyy HH:MM:ss')             //  "Tue Jul 08th 2014 11:18:55"
littleTime('Jul 07 2014 20:10:23', 'ddd mmm ddS yyyy hh:MM:sstt')  //  "Mon Jul 07th 2014 08:10:23pm"
littleTime(Date.now(), 'dd-mm-yyyy hh:MM:ssTT')                    //  "08-07-2014 11:24:13AM"
littleTime(new Date(), 'dd-mm-yyyy hh:MM:ssTT')                    //  "08-07-2014 11:25:31AM"

//  UTC time
littleTime(new Date(), 'dd-mm-yyyy hh:MM:ssTT', true)              //  "08-07-2014 18:25:59PM"
```


============
TODO

* time zones
