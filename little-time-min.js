(function(e,r){if(typeof define==="function"&&define.t){define(["require"],r)}else if(typeof exports==="object"){module.o=r()}else{e._=r()}})(this,function(){"use strict";var _=[{u:6e4,i:"a few seconds"},{u:12e4,i:"a minute"},{u:36e5,i:"minutes",m:true},{u:72e5,i:"an hour"},{u:864e5,i:"hours",m:true},{u:1728e5,i:"a day"},{u:26784e5,i:"days",m:true},{u:53568e5,i:"a month"},{u:31536e6,i:"months",m:true},{u:63072e6,i:"a year"}];var u={s:"Month",k:"Date",l:"Day",h:"FullYear",p:"Hours",v:"Minutes",M:"Seconds",D:"Milliseconds"};var t=[null,"January","February","March","April","May","June","July","August","September","October","November","December"];var n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var r=function(e,r){if(typeof e==="function")e=e();return a(t[e],r)};var o=function(e,r){if(typeof e==="function")e=e();return a(n[e],r)};var a=function(e,r){return typeof r==="number"&&r?e.substr(0,r):e};var i=function e(r,t){var n=this;if(!n||!(n instanceof e)){return new e(r)}n.Y=t;n.S=typeof r!=="undefined"?new Date(r):new Date;return n};i.prototype.g=function(){var e=this;return[{H:"MMMM",N:r.bind(e,e.A.bind(e,u.s))},{H:"MMM",N:r.bind(e,e.A.bind(e,u.s),3)},{H:"MM",N:e.A.bind(e,u.s,2)},{H:"Mo",N:e.A.bind(e,u.s,null,true)},{H:"M",N:e.A.bind(e,u.s)},{H:"Qo",N:e.I.bind(e,true)},{H:"Q",N:e.I.bind(e)},{H:"DDDD",N:e.T.bind(e,3)},{H:"DDDo",N:e.T.bind(e,null,true)},{H:"DDD",N:e.T.bind(e)},{H:"DD",N:e.A.bind(e,u.k,2)},{H:"Do",N:e.A.bind(e,u.k,null,true)},{H:"D",N:e.A.bind(e,u.k)},{H:"dddd",N:o.bind(e,e.A.bind(e,u.l))},{H:"ddd",N:o.bind(e,e.A.bind(e,u.l),3)},{H:"dd",N:o.bind(e,e.A.bind(e,u.l),2)},{H:"do",N:e.A.bind(e,u.l,null,true)},{H:"d",N:e.A.bind(e,u.l)},{H:"ww",N:e.Z.bind(e,2)},{H:"wo",N:e.Z.bind(e,null,true)},{H:"w",N:e.Z.bind(e)},{H:"yyyy",N:e.A.bind(e,u.h)},{H:"YYYY",N:e.A.bind(e,u.h)},{H:"yy",N:function(){return e.A(u.h).substr(2,2)}},{H:"YY",N:function(){return e.A(u.h).substr(2,2)}},{H:"y",N:e.A.bind(e,u.h)},{H:"Y",N:e.A.bind(e,u.h)},{H:"A",N:e.F.bind(e,true)},{H:"a",N:e.F.bind(e)},{H:"HH",N:e.A.bind(e,u.p,2)},{H:"H",N:e.A.bind(e,u.p)},{H:"hh",N:function(){return e.J(e.A(u.p)%12,2)}},{H:"h",N:function(){return e.A(u.p)%12}},{H:"kk",N:function(){return e.J(parseInt(e.A(u.p))+1,2)}},{H:"k",N:function(){return parseInt(e.A(u.p))+1}},{H:"mm",N:e.A.bind(e,u.v,2)},{H:"m",N:e.A.bind(e,u.v)},{H:"ss",N:e.A.bind(e,u.M,2)},{H:"s",N:e.A.bind(e,u.M)},{H:"SSS",N:e.A.bind(e,u.D)},{H:"SS",N:function(){return Math.floor(parseInt(e.A(u.D))/10)}},{H:"S",N:function(){return Math.floor(parseInt(e.A(u.D))/100)}},{H:"X",N:function(){return Math.floor(e.S.getTime()/1e3)}},{H:"x",N:function(){return e.S.getTime()}}]};i.prototype.format=function(e){var r=this;if(!e)e="YYYY-MM-DDTHH:mm:ssZ";if(!r.j){r.j=r.g();r.q=r.j.map(function(e){return e.H+"+|"}).join("");r.q=new RegExp(r.q,"g")}return e.replace(r.q,r.C.bind(r))};i.prototype.C=function(e){var r=this;for(var t=0,n=r.j.length;t<n;t++){if(e===r.j[t].H){return r.j[t].N.call(r,e)}}return e};i.prototype.F=function(e){var r=this.A(u.p)<12?"am":"pm";return typeof e==="boolean"&&e?r.toUpperCase():r};i.prototype.O=function(e){if(e>10&&e<20){return"th"}var r=e%10;switch(r){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}};i.prototype.J=function(e,r,t){e=e+"";r=r||2;t=t||"0";return e.length>=r?e:new Array(r-e.length+1).join(t)+e};i.prototype.A=function(e,r,t){var n=this;var o=n.Y?"getUTC":"get";var a=n.S[o+e]();if(e===u.s)a++;if(typeof r==="number"&&r>0){a=n.J(a,r)}if(typeof t==="boolean"&&t){a+=n.O(a)}return""+a};i.prototype.T=function(e,r){var t=this;var n=new Date("1/1/"+t.A(u.h)+" 0:0:0 Z");var o=Math.floor((t.S.getTime()-n)/864e5+1);if(e>0){o=t.J(o,e)}if(typeof r==="boolean"&&r){o+=t.O(o)}return o};i.prototype.Z=function(e,r){var t=this;var n=new Date("1/1/"+t.A(u.h)+" 0:0:0 Z");var o=Math.floor((t.T()+n.getUTCDay()-1)/7)+1;var a=new Date("12/31/"+t.A(u.h)+" 0:0:0 Z");var f=a.getUTCDay();if(o===53&&f!==6){o=1}if(e>0){o=t.J(o,e)}if(typeof r==="boolean"&&r){o+=t.O(o)}return o};i.prototype.I=function(e){var r=this;var t=Math.ceil(r.A(u.s)/3);return typeof e==="boolean"&&e?t+r.O(t):t};i.prototype.from=function(e,r){if(e instanceof i){e=e.S}var t=e-this.S;var n=false;if(t<0){n=true;t=Math.abs(t)}var o;for(var a=0,f=_.length;a<f;a++){if(t<_[a].u){if(_[a].m){o=Math.floor(t/_[a-2].u)+" "+_[a].i}else{o=_[a].i}break}o=Math.floor(t/_[_.length-2].u)+" years"}if(!r){if(n){o="in "+o}else{o+=" ago"}}return o};i.prototype.R=function(){return this.from(Date.now())};i.U=function(e){return new i(e,true)};return i});