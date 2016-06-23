var co = function (fn) {
  return function(done) {
    var ctx = this;
    var gen = fn.call(ctx);
    var it = null;
    function _next(err, res) {
      it = gen.next(res);
      if (it.done) {
        done.call(ctx, err, it.value);
      } else {
        it.value(_next);
      }
    }
    _next();
  }
}
exports.co = co
