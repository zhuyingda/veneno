var uriParser = require('../src/uriParser');

var arr = [
    'http://s.yx-s.net/s.htm?p=youxi_xyx_all&u=http%3A%2F%2Fxiao.youxi.com%2F&id=61976101.2173755882480503000.1464758244660.2964&guid=61976101.2173755882480503000.1464758244660.2964&b=chrome&c=12&r=&fl=23&t=1483176794913'
];

for (var i in arr) {
    console.log(uriParser(arr[i]));
}


