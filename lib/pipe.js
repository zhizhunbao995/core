var arrPipe = [];
		arrPipe.count = 0; 
exports.add = function  (fn) {
	arrPipe.push(fn)
}
exports.pipe = function (o) {
	var self = this;
	if (arrPipe.count < arrPipe.length) {
		arrPipe[arrPipe.count++].call(null,o,function () {
			self.pipe(o);
		})
	}
}