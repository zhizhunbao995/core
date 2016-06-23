/*====================extend test=============================*/
var extend = require("./lib/oop.js").extend;
var pipe = require("./lib/pipe.js");
var co = require("./lib/midco.js").co;
function Programmer(name) {
    this.name = name;
}
Programmer.prototype.getName = function () {
    return this.name;
};

function FrontEndProgrammer(name, gender) {
    // 调用父类构造器
    // FrontEndProgrammer.superclass.constructor.call(this, name);
    this.gender = gender;
}
FrontEndProgrammer.prototype.getGender = function () {
    return this.gender;
};


extend(FrontEndProgrammer, Programmer);
var ab = new FrontEndProgrammer("xuan");
console.dir(ab.getGender)
// pipe 测试
pipe.add(function  (o,next) {
	debugger;
	o["1"] = 1
	console.log(o,1);
	next();
})
pipe.add(function  (o,next) {
	o["2"] = 2
	console.log(o,2);
	next();
})
pipe.add(function  (o,next) {
	o["3"] = 3
	console.log(o,3);
	next();
})
console.log(pipe.pipe({a:1}))



/*================test midco===========================*/

var testFun = function *(){
		var a = yield function(fn){ console.log("1"),setTimeout(function(){ fn("","3") },3000)};
		var b = yield function(fn){ console.log("2"),setTimeout(function(){ fn("","4") })};
		s = [a,b]
		console.log(s);
		return s;
}
co(testFun)(function(a){
	console.log(a)
})