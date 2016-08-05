(function(e,t){if(typeof define==="function"&&define.amd){define(["require"],t)}else if(typeof exports==="object"){module.exports=t()}else{e.littleTime=t()}})(this,function(){"use strict";var e=function(e,n,s){var o=["January","February","March","April","May","June","July","August","September","October","November","December"];var u=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];switch(n){case"MMMM":return o[s?e.getUTCMonth():e.getMonth()];break;case"MMM":return o[s?e.getUTCMonth():e.getMonth()].substr(0,3);break;case"MM":return a((s?e.getUTCMonth():e.getMonth())+1);break;case"Mo":return s?e.getUTCMonth()+1+r(e.getUTCMonth()+1):e.getMonth()+1+r(e.getMonth()+1);break;case"M":return(s?e.getUTCMonth()+1:e.getMonth())+1;break;case"DD":return s?a(e.getUTCDate()):a(e.getDate());break;case"Do":return s?e.getUTCDate()+r(e.getUTCDate()):e.getDate()+r(e.getUTCDate());break;case"D":return s?e.getUTCDate():e.getDate();break;case"dddd":return u[s?e.getUTCDay():e.getDay()];break;case"ddd":return u[s?e.getUTCDay():e.getDay()].substr(0,3);break;case"dd":return u[s?e.getUTCDay():e.getDay()].substr(0,2);break;case"d":return s?e.getUTCDay():e.getDay();break;case"yyyy":case"YYYY":return s?e.getUTCFullYear():e.getFullYear();break;case"yy":case"YY":return(""+(s?e.getUTCFullYear():e.getFullYear())).substr(2,2);break;case"y":case"Y":return s?e.getUTCFullYear():e.getFullYear();break;case"A":return t(e,s).toUpperCase();break;case"a":return t(e,s);break;case"HH":return a(s?e.getUTCHours():e.getHours());break;case"H":return s?e.getUTCHours():e.getHours();break;case"hh":return a(s?e.getUTCHours():e.getHours()%12);break;case"h":return s?e.getUTCHours():e.getHours()%12;break;case"kk":return a(s?e.getUTCHours()+1:e.getHours()+1);break;case"k":return s?e.getUTCHours()+1:e.getHours()+1;break;case"mm":return a(s?e.getUTCMinutes():e.getMinutes());break;case"m":return s?e.getUTCMinutes():e.getMinutes();break;case"ss":return a(s?e.getUTCSeconds():e.getSeconds());break;case"s":return s?e.getUTCSeconds():e.getSeconds();break;case"SSS":return s?e.getUTCMilliseconds():e.getMilliseconds();break;case"SS":return s?Math.floor(e.getUTCMilliseconds()/10):Math.floor(e.getMilliseconds()/10);break;case"S":return s?Math.floor(e.getUTCMilliseconds()/100):Math.floor(e.getMilliseconds()/100);break;case"X":return Math.floor(e.getTime()/100);break;case"x":return e.getTime();break;default:return n}};var t=function(e,t){var r=t?e.getUTCHours():e.getHours();return r<12?"am":"pm"};var r=function(e){switch(e){case 1:case 21:case 31:return"st";break;case 2:case 22:return"nd";break;case 3:case 23:return"rd";break;default:return"th"}};var a=function(e,t,r){e=e+"";t=t||2;r=r||"0";return e.length>=t?e:new Array(t-e.length+1).join(r)+e};var n=function e(t,r){if(!this||!this instanceof e){return new e(t)}this.isUTC=r;this.datetime=typeof t!=="undefined"?new Date(t):new Date;return this};n.prototype.format=function(t){if(typeof t==="undefined")t="YYYY-MM-DDTHH:mm:ssZ";var r=this;var a=function(t){return e(r.datetime,t,r.isUTC)};return t.replace(/(MMMM+|MMM+|MM+|Mo+|M+|Qo+|Q|DDDD+|DDDo+|DDD+|DD+|Do+|D+|dddd+|ddd+|dd+|do+|d+|e+|E+|wo+|ww+|w+|Wo+|WW+|W+|YYYY+|YY+|Y+|gggg+|gg+|GGGG+|GG+|A+|a+|HH+|H+|hh+|h+|kk+|k+|mm+|m+|ss+|s+|SSS+|SS+|S+|zz+|z+|ZZ+|Z+|X+|x+)/g,a)};n.prototype.from=function(e){var t={minute:6e4,twoMinutes:12e4,hour:36e5,twoHours:72e5,day:864e5,twoDays:1728e5,month:26784e5,twoMonths:53568e5,year:31536e6,twoYears:63072e6};var r=e-this.datetime;if(r<t.minute){return"a few seconds ago"}else if(r<t.twoMinutes){return"a minute ago"}else if(r<t.hour){return Math.floor(r/t.minute)+" minutes ago"}else if(r<t.twoHours){return"an hour ago"}else if(r<t.day){return Math.floor(r/t.hour)+" hours ago"}else if(r<t.twoDays){return"a day ago"}else if(r<t.month){return Math.floor(r/t.day)+" days ago"}else if(r<t.twoMonths){return"a month ago"}else if(r<t.year){return Math.floor(r/t.month)+" months ago"}else if(r<t.twoYears){return"a year ago"}else{return Math.floor(r/t.year)+" years ago"}return this};n.prototype.fromNow=function(){return this.from(Date.now())};n.utc=function(e){var t=true;return new n(e,t)};return n});