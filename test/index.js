var assert = require('assert');
var should = require('should');
var findZeroRange = require("../index.js");

function linearF(slope, x0){
    return function(x){ return slope*(x-x0); };
}

function linearStepF(slope,divisor,x0){
    return function(x){ return slope*Math.floor((x-x0)/divisor); };
}

describe('#findZeroRange ', function(){
    'use strict';
    describe('linear functions, positive slope ', function(){
	var slopes = [0.00001,0.01,1, 3.45, 10, 74.3, 298, 17345];
	var x0 = [-90,-63.5,-21.1, -10, -5, -0.8765, 0.25, 3.1415926, 7, 45, 123, 456, 948.4321];
	var testgen = function(l,h,tol,mathFuncFunc, testFunc){
	    return function(){
		slopes.forEach(function(s){
		    x0.forEach(function(z){
			var zeroRange = findZeroRange(l,h,tol,mathFuncFunc(s,z));
			testFunc({
			    l:l,
			    h:h,
			    tol:tol,
			    mathFuncFunc:mathFuncFunc,
			    slope:s,
			    x0:z,
			    zeroRange: zeroRange
			});
		    });
		});
	    };
	};
	it('should find an interval with one point', 
	   testgen(-1000,1000,0.00001,linearF,function(t){
	       assert.strictEqual(t.zeroRange.length, 2);
	       assert.strictEqual(t.zeroRange[0],t.zeroRange[1]);
	   }));
	it('should find the zero to tol of 0.000001', 
	   testgen(-1000,1000,0.000001,linearF,function(t){
	       t.zeroRange[0].should.be.approximately(t.x0,t.tol);
	       t.zeroRange[1].should.be.approximately(t.x0,t.tol);
	   }));
	it('should find an approximate zero to tol 1 and be an integer', 
	   testgen(-1000,1000,1,linearF,function(t){
	       assert.strictEqual(t.zeroRange[0],Math.floor(t.zeroRange[0]));
	       assert.strictEqual(t.zeroRange[1],Math.floor(t.zeroRange[1]));
	       t.zeroRange[0].should.be.approximately(t.x0,t.tol);
	       t.zeroRange[1].should.be.approximately(t.x0,t.tol);
	   }));

	it('should throw when the search range is too low', function(){
	    var toolow = function(){
		var rng = findZeroRange(0,100,0.001,linearF(1,1000));
	    };
	    toolow.should.throw();
	});

	it('should throw when the search range is too high', function(){
	    var toohigh = function(){
		var rng = findZeroRange(10000,20000,0.001,linearF(1,1000));
	    };
	    toohigh.should.throw();
	});
	       

    });


    describe('linear function, negative slope', function(){
	it('should throw when the function is decreasing', function(){
	    var decreasing = function(){
		var rng = findZeroRange(0,100,0.001,linearF(-1,50));
	    };
	    decreasing.should.throw();
	});
    });

    describe('non-zero constant function', function(){
	it('should throw', function(){
	    var negconst = function(){
		var rng = findZeroRange(0,100,0.01,function(x){ return -5; });
	    };
	    var posconst = function(){
		var rng = findZeroRange(0,100,0.01,function(x){ return 42; });
	    };
	    negconst.should.throw();
	    posconst.should.throw();
	});
    });
    
    describe('zero constant function ', function(){
	it('should return [l,h] as zero range', function(){
	    findZeroRange(0,100,0.01,function(x){ return 0; }).should.eql([0,100]);
	    findZeroRange(-232,147,1,function(x){ return 0; }).should.eql([-232,147]);
	});
    });

    describe('linear step functions, positive slope', function(){
	var slopes = [0.00001,0.01,1, 3.45, 10, 74.3, 298, 17345];
	var divisors = [0.1,0.3333,0.5,1,2,5,7,13,17,25,101,243,412,542];
	var x0 = [-90,-63.5,-21.1, -10, -5, -0.8765, 0.25, 3.1415926, 7, 45, 123, 456];
	var testgen = function(l,h,tol,testFunc){
	    return function(){
		slopes.forEach(function(s){
		    divisors.forEach(function(d){
			x0.forEach(function(z){
			    var zeroRange = findZeroRange(l,h,tol,linearStepF(s,d,z));
			    testFunc({
				l:l,
				h:h,
				tol:tol,
				slope:s,
				divisor:d,
				x0:z,
				x1:z+d,
				zeroRange: zeroRange
			    });
			});
		    });
		});
	    };
	};
	it('should find an interval with distinct endpoints', 
	   testgen(-1000,1000,0.00001,function(t){
	       assert.ok(t.zeroRange.length===2);
	       assert.ok(t.zeroRange[0]<t.zeroRange[1]);
	   }));
	it('should find the range to tol of 0.000001', 
	   testgen(-1000,1000,0.000001,function(t){
	       t.zeroRange[0].should.be.approximately(t.x0,t.tol);
	       t.zeroRange[1].should.be.approximately(t.x1,t.tol);
	   }));
	it('should find an approximate zero to 1 tol and be an integer', 
	   testgen(-1000,1000,1,function(t){
	       assert.strictEqual(t.zeroRange[0],Math.floor(t.zeroRange[0]));
	       assert.strictEqual(t.zeroRange[1],Math.floor(t.zeroRange[1]));
	       t.zeroRange[0].should.be.approximately(t.x0,t.tol);
	       t.zeroRange[1].should.be.approximately(t.x1,t.tol);
	   }));
    });
    

});
