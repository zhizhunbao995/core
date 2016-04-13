/*           
     * @method extend oop 继承类 
     * @param {function} r   the object to modify.
     * @param {function} s the object to inherit.
     * @param {object} px prototype properties to add/override.
     * @param {object} sx static properties to add/override.
     * @return {object} the extended object.
*/
var OP = Object.prototype;
var OB = Object.create ?
        Object.create:
        function (proto, c) {
            function F() {
            }
            F.prototype = proto;

            var o = new F();
            return o;
        }
var mix = function(r, s, ov, wl){
        if (!s || !r) {
            return r;
        }
        if (ov === undefined) {
            ov = true;
        }
        var i, p, l;
        if (wl && (l = wl.length)) {
            for (i = 0; i < l; i++) {
                p = wl[i];
                if (p in s) {
                    if (ov || !(p in r)) {
                        r[p] = s[p];
                    }
                }
            }
        }
        else {
            for (p in s) {
                if (ov || !(p in r)) {
                    r[p] = s[p];
                }
            }
        }
        return r;
    };
exports.extend = function(r, s, px, sx) {
        if (!s || !r) {
            return r;
        }
    
        var sp = s.prototype, rp = OB(sp);
        mix(r.prototype,rp)
        // r.prototype = rp;    
        rp.constructor = r;
        r.superclass = sp;
    
        // assign constructor property
        if (s != Object && sp.constructor == OP.constructor) {
            sp.constructor = s;
        }
    
        // add prototype overrides
        if (px) {
            mix(rp, px, true);
        }
    
        // add object overrides
        if (sx) {
            mix(r, sx, true);
        }
    
        return r;
};
exports.augment = function (receiver, supplier, args) {
    var rProto    = receiver.prototype,
        sProto    = supplier.prototype,
        copy,
        property;

    args = args ? Y.Array(args) : [];

    copy = function (value, key) {
        if (!(key in rProto)) {
            if (Object.prototype.toString.call(value) === '[object Function]') {
                rProto[key] = function () {
                    // 将方法赋给实例
                    this[key] = value;
                    // 执行提供类构造器
                    supplier.apply(this, args);
                    // 执行提供类方法
                    return value.apply(this, arguments);                
                };
            } else {
                rProto[key] = value;
            }
        }
    };

    for (property in sProto) {
        copy.call(null, sProto[property], property);
    }

    return receiver;
};