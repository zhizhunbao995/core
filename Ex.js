/*====================extend test=============================*/
var extend = require("./lib/oop.js").extend;
var pipe = require("./lib/pipe.js");
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