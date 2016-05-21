/**
 * @file 反射型xss测试
 */

"use strict";
var xss = require('../src/xss').reflect;
var fs = require('fs');
var path = require('path');

var testIp = fs.readFileSync(path.resolve(__dirname, "../") + "/.venenoconf").toString();
var host = testIp + ':3000';

/**
 * @param url: 要测试的host+path但不包括query
 * @param params: 要测试的query参数列表
 * @param log: 日志统计方式，none为不记录，print为打印出来
 */
xss({
    url: 'http://bbs.treebear.cn/search.php',
    params: ["mod","searchid","orderby","lastpost","ascdesc","searchsubmit","kw"],
    log: "none"
});