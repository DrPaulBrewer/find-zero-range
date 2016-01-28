/* Copyright 2016 Paul Brewer, Economic & Financial Technology COnsulting LLC  <drpaulbrewer@eaftc.com> */
/* License: MIT https://opensource.org/licenses/MIT  */

module.exports = function(l,h,tol,f){
    'use strict';
    // returns a two element array giving an inclusive range of zero values of f
    // requires strictly everywhere non-descending function f
    // use with caution:  this code assumes but does and can not check that f is everywhere non-descending
    var right=h,left=l,intflag=(tol>=1);
    var fl = f(l), fh=f(h);
    if ((fl===0) && (fh===0)) return [l,h];
    if (fh<fl) throw "findZeroRange: requires non-descending function";
    if (fl>=0) throw "findZeroRange: search range too high"; 
    if (fh<=0) throw "findZeroRange: search range too low";
    var zleft,zright,mid;
    zright=left;
    while ((right-zright)>tol){
	mid = (right+zright)/2;
	if (intflag) mid = Math.floor(mid);
	if (f(mid)>0)
	    right =  mid;
	else 
	    zright = mid;
    }
    if (f(zright)<0)
	return [zright,zright];
    zleft=zright;
    while ((zleft-left)>tol){
	mid = (left+zleft)/2;
	if (intflag) mid = Math.floor(mid);
	if (f(mid)<0)
	    left = mid;
	else
	    zleft = mid;
    }
    return [zleft, zright];
};


