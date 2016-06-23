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
exports._fixscreen =function (oiriginWidth,oiriginHeight,screenWidth,screenHeight) {
    var screenRatio = screenWidth/screenHeight,
        imgRatio = oiriginWidth/oiriginHeight;
    if (imgRatio > screenRatio) {// width 比较大 height 比较小
        oiriginHeight = screenHeight;
        oiriginWidth = oiriginHeight * imgRatio
    }else{// height 比较大 width 比较小
        oiriginWidth = screenWidth;
        oiriginHeight = oiriginWidth / imgRatio
    }
    return {width:oiriginWidth,height:oiriginHeight}
}