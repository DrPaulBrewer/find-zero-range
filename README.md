find-zero-range
=======

Npm Javascript package to find, approximately, via bisection, a range of values [x0,x1] such that for x in [x0,x1], f(x)===0
for a **strictly non-decreasing function f()**  

Note:  It is the users responsibility to make sure that f() is strictly non-decreasing and achieves f(x)===0 for a finite interval. 

Using find-zero-range with a function that is decreasing may or may not throw an error and could yield invalid results.

Using find-zero-range on functions that achieve f(x)===0 for only one point value x will yield only approximate results.  Typically a single point interval return looks like [23,23] is to one side or the other of the actual zero.  For instnace, the actual zero might be at x=23.001 or x=22.999 or some other nearby value within the tolerance band.   Functions that are technically never zero but jump across zero will also return a point like result near the jump.

findZeroRange uses bisection internally, not Newton's method, and therefore is relatively insensitive to discontinuities or misbehavior in the rate of change of f.

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
    --> throws *findZeroRange: search range too high*

###tests

    make tests

test framework uses mocha




