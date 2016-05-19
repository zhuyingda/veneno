"use strict";
var xss = require('../src/xss').reflect;
var fs = require('fs');
var path = require('path');

var testIp = fs.readFileSync(path.resolve(__dirname, "../") + "/.venenoconf").toString();
var host = 'www.chuangkit.com';

/**
 * @param url: 要测试的host+path但不包括query
 * @param params: 要测试的query参数列表
 * @param log: 日志统计方式，none为不记录，print为打印出来
 */
xss({
    url: 'http://' + host + '/mod/design/design.html',
    params: ["d","h","k","sec","w","kt"],
    log: "none"
});