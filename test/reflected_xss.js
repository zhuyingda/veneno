var xss = require('../lib/xss/reflected_xss');
var fs = require('fs');
var path = require('path');

var testIp = fs.readFileSync(path.resolve(__dirname, "../") + "/.venenoconf").toString();
var host = testIp + ':3000';

xss({
    uri: 'http://' + host + '/xss',
    params: ["param1",'param2','param3'],
    cookie: "key=10010; key2=2012; key3=xxxxx",
    log: "print"
});