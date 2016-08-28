(function(e,r){if(typeof define==="function"&&define.amd){define(["require"],r)}else if(typeof exports==="object"){module.exports=r()}else{e.littleTime=r()}})(this,function(){"use strict";var e=[{a:6e4,b:"a few seconds"},{a:12e4,b:"a minute"},{a:36e5,b:"minutes",c:true},{a:72e5,b:"an hour"},{a:864e5,b:"hours",c:true},{a:1728e5,b:"a day"},{a:26784e5,b:"days",c:true},{a:53568e5,b:"a month"},{a:31536e6,b:"months",c:true},{a:63072e6,b:"a year"}];var r={d:"Month",e:"Date",f:"Day",g:"FullYear",h:"Hours",i:"Minutes",j:"Seconds",k:"Milliseconds"};var t=[null,"January","February","March","April","May","June","July","August","September","October","November","December"];var a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var s=function e(r,t){if(!this||!(this instanceof e)){return new e(r)}this.l=t;this.m=typeof r!=="undefined"?new Date(r):new Date;return this};s.prototype.format=function(e){if(typeof e==="undefined")e="YYYY-MM-DDTHH:mm:ssZ";var r=this;var t=function(e){return r.n(r.m,e,r.l)};return e.replace(/(MMMM+|MMM+|MM+|Mo+|M+|Qo+|Q|DDDD+|DDDo+|DDD+|DD+|Do+|D+|dddd+|ddd+|dd+|do+|d+|e+|E+|wo+|ww+|w+|Wo+|WW+|W+|YYYY+|YY+|Y+|yyyy+|yy+|y+|gggg+|gg+|GGGG+|GG+|A+|a+|HH+|H+|hh+|h+|kk+|k+|mm+|m+|ss+|s+|SSS+|SS+|S+|zz+|z+|ZZ+|Z+|X+|x+)/g,t)};s.prototype.n=function(e,s){switch(s){case"MMMM":return t[this.o(e,r.d)];break;case"MMM":return t[this.o(e,r.d)].substr(0,3);break;case"MM":return this.o(e,r.d,2);break;case"Mo":return this.o(e,r.d)+this.p(this.o(e,r.d));break;case"M":return this.o(e,r.d);break;case"DDDD":return this.q(e,3);break;case"DDDo":return this.q(e)+this.p(this.q(e));break;case"DDD":return this.q(e);break;case"DD":return this.o(e,r.e,2);break;case"Do":return this.o(e,r.e)+this.p(this.o(e,r.e));break;case"D":return this.o(e,r.e);break;case"dddd":return a[this.o(e,r.f)];break;case"ddd":return a[this.o(e,r.f)].substr(0,3);break;case"dd":return a[this.o(e,r.f)].substr(0,2);break;case"do":return this.o(e,r.f)+this.p(this.o(e,r.f));break;case"d":return this.o(e,r.f);break;case"yyyy":case"YYYY":return this.o(e,r.g);break;case"yy":case"YY":return this.o(e,r.g).substr(2,2);break;case"y":case"Y":return this.o(e,r.g);break;case"A":return this.r(e).toUpperCase();break;case"a":return this.r(e);break;case"HH":return this.o(e,r.h,2);break;case"H":return this.o(e,r.h);break;case"hh":return this.s(this.o(e,r.h)%12,2);break;case"h":return this.o(e,r.h)%12;break;case"kk":return this.s(parseInt(this.o(e,r.h))+1,2);break;case"k":return parseInt(this.o(e,r.h))+1;break;case"mm":return this.o(e,r.i,2);break;case"m":return this.o(e,r.i);break;case"ss":return this.o(e,r.j,2);break;case"s":return this.o(e,r.j);break;case"S":return Math.floor(parseInt(this.o(e,r.k))/100);break;case"SS":return Math.floor(parseInt(this.o(e,r.k))/10);break;case"SSS":return this.o(e,r.k);break;case"X":return Math.floor(e.getTime()/1e3);break;case"x":return e.getTime();break;default:return s}};s.prototype.r=function(e){var t=this.o(e,r.h);return t<12?"am":"pm"};s.prototype.p=function(e){if(e>10&&e<20){return"th"}var r=e%10;switch(r){case 1:return"st";break;case 2:return"nd";break;case 3:return"rd";break;default:return"th"}};s.prototype.s=function(e,r,t){e=e+"";r=r||2;t=t||"0";return e.length>=r?e:new Array(r-e.length+1).join(t)+e};s.prototype.o=function(e,t,a){var s=this.l?e["getUTC"+t]():e["get"+t]();if(t===r.d)s++;if(a&&a>0){s=this.s(s,a)}return""+s};s.prototype.q=function(e,t){var a=this.o(e,r.g);var s=new Date("1/1/"+a+" 0:0:0");s=s.getTime()-s.getTimezoneOffset()*60*1e3;var n=Math.floor((e.getTime()-s)/864e5+1);if(t&&t>0){n=this.s(n,t)}return n};s.prototype.from=function(r,t){var a=r-this.m;var s=false;if(a<0){s=true;a=Math.abs(a)}var n;for(var o=0,i=e.length;o<i;o++){if(a<e[o].a){if(e[o].c){n=Math.floor(a/e[o-2].a)+" "+e[o].b}else{n=e[o].b}break}n=Math.floor(a/e[e.length-2].a)+" years"}if(!t){if(s){n="in "+n}else{n+=" ago"}}return n};s.prototype.fromNow=function(){return this.from(Date.now())};s.utc=function(e){return new s(e,true)};return s});