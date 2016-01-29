find-zero-range
=======

Npm Javascript package to find, approximately, via bisection, a single-element array `[x0]` or two-element array `[x0,x1]` (representing
the inclusive range `x0<=x<=x1`) approximating f(x)~0 for a **strictly non-decreasing function f()**  An empty array `[]` is returned if there are no zeroes of f within the search
range, relying on the assumption that f is in fact non-decreasing.  

Note:  It is the users responsibility to make sure that f() is strictly non-decreasing. 

Using find-zero-range with a function that is decreasing will throw an error if `f(h)<f(l)`.  This simple check will not detect functions that are decreasing on a subinterval, which could yield invalid results.

When a range [x0,x1] is returned it is guaranteed that f(x0)===0 and f(x1)===0, but no such guaranteee exists when a single element [x] is returned.

findZeroRange uses bisection internally, not Newton's method, and therefore is relatively insensitive to discontinuities or misbehavior in the rate of change of f.
The bisection code searches for the zero crossing first and then searches for zero values, and so will find crossings of functions that "jump over" zero as well as those that are actually zero.


Intended application: finding intervals where a step function equals zero

###INSTALLATION

    npm install find-zero-range --save

###usage

    var findZeroRange = require('find-zero-range');
    typeof(findZeroRange)
    --> 'function'
    // findZeroRange(number low,number high,number tolerance,function func) 
    // returns two element number array
    var step100Func = function(x){ return 100*Math.floor(x/100); };
    step100Func(0)
    --> 0
    step100Func(99)
    --> 0
    step100Func(100)
    --> 100
    findZeroRange(-1000,1000,1,step100Func) 
    // tolerance of 1 or more yields integer results
    --> [0,99]
    findZeroRange(-1000,1000,0.000001,step100Func)
    --> [ 2.666969188894197e-7, 99.99999962747097 ]
    findZeroRange(200,300,1,step100Func)
    --> []

###tests

    make test

test framework uses mocha




