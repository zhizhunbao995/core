exports.imgRatio = function  (src,bw,bh,callback) {
    var img = new Image();
    var ratio = bw/bh;
    img.onload = function(){
        var pix = this.width/this.height;
        var height = this.height,
            width = this.width;
        if(pix > ratio){
            if(this.width > bw){
                width = bw;
                height = bw/pix;
            }
        }else{
            if(this.height > bh){
                width = pix*bh;
                height = bh;
            }
        }
        img.onload = null;
        callback && callback(width,height)
    } 
    img.src = src;
}
exports.ratio = function  (originRatio,width,height) {
    if (!isNaN(originRatio)) {
      var ratioDiff = width / height - originRatio
      if (ratioDiff > 0.01) {
        width = height * originRatio
      } else if (ratioDiff < -0.01) {
        height = width / originRatio
      }
    }
    return {width:width,height,height}
}