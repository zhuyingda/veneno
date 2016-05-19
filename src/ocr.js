var OCRAD = require('../lib/ocrad.js');
var Canvas = require('canvas');
var Image = Canvas.Image;
var fs = require('fs');
var path = require("path");

fs.readFile(path.resolve(__dirname , '../test/test6.jpg'), function(err, src) {
    if (err) {
        throw err;
    }
    var img = new Image();
    img.src = src;
    var canvas = new Canvas(img.width, img.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    console.log(OCRAD(canvas));
});